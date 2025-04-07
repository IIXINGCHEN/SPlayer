/**
 * 歌词处理工具
 * 整合了原来的多个歌词处理文件的功能
 */
import { LyricLine, parseLrc, parseYrc } from "@applemusic-like-lyrics/lyric";
import type { LyricLine as AMLLLyricLine } from '@/types/amll';
import { siteSettings } from "@/stores";
import { msToS } from "./time.ts";

// 获取排除关键词
const getExcludeKeywords = (): string[] => {
  // 从设置中获取排除关键词
  return ['纯音乐', 'instrumental', '作词', '作曲', 'op', 'ed', 'www', 'http'];
};

/**
 * 创建空的歌词数据结构
 */
export const createEmptySongLyric = () => {
  return {
    lrcData: [],
    lrcAMData: [],
    yrcData: [],
    yrcAMData: [],
    hasYrc: false,
    hasLrcTran: false,
    hasLrcRoma: false,
  };
};

/**
 * 解析普通歌词数据
 * @param lrcData 原始LRC歌词行数组
 * @returns 处理后的歌词数据
 */
export const parseLrcData = (lrcData: LyricLine[]): any[] => {
  if (!lrcData || !lrcData.length) return [];
  
  // 数据处理
  const lrcList = lrcData
    .map((line) => {
      const words = line.words;
      if (!words || !words.length) return null;
      
      const time = msToS(words[0].startTime);
      const content = words[0].word.trim();
      
      // 排除内容
      if (!content || getExcludeKeywords().some((keyword) => content.includes(keyword))) {
        return null;
      }
      
      return {
        time,
        content,
      };
    })
    .filter((line) => line !== null);
  
  return lrcList;
};

/**
 * 解析逐字歌词数据
 * @param yrcData 原始YRC歌词行数组
 * @returns 处理后的歌词数据
 */
export const parseYrcData = (yrcData: LyricLine[]): any[] => {
  if (!yrcData || !yrcData.length) return [];
  
  // 数据处理
  const yrcList = yrcData
    .map((line) => {
      const words = line.words;
      if (!words || !words.length) return null;
      
      const time = msToS(words[0].startTime);
      const endTime = msToS(words[words.length - 1].endTime);
      
      const contents = words.map((word) => {
        return {
          time: msToS(word.startTime),
          endTime: msToS(word.endTime),
          duration: msToS(word.endTime - word.startTime),
          content: word.word.trim(),
          endsWithSpace: word.word.endsWith(" "),
        };
      });
      
      // 完整歌词
      const contentStr = contents
        .map((word) => word.content + (word.endsWithSpace ? " " : ""))
        .join("");
      
      // 排除内容
      if (!contentStr || getExcludeKeywords().some((keyword) => contentStr.includes(keyword))) {
        return null;
      }
      
      return {
        time,
        endTime,
        content: contentStr,
        contents,
      };
    })
    .filter((line) => line !== null);
  
  return yrcList;
};

/**
 * 歌词内容对齐
 * @param lyrics 主歌词数组
 * @param otherLyrics 翻译或音译歌词数组
 * @param key 对齐类型
 * @returns 对齐后的歌词数组
 */
export const alignLyrics = (lyrics: any[], otherLyrics: any[], key: "tran" | "roma"): any[] => {
  if (!lyrics.length || !otherLyrics.length) return lyrics;
  
  // 创建副本以避免修改原始数据
  const lyricsData = [...lyrics];
  
  // 遍历主歌词，为每行查找匹配的翻译/音译
  lyricsData.forEach((line) => {
    // 查找时间匹配或接近的翻译/音译行
    const matchedLine = otherLyrics.find(
      (otherLine) => line.time === otherLine.time || Math.abs(line.time - otherLine.time) < 0.6
    );
    
    // 如果找到匹配行，添加翻译/音译内容
    if (matchedLine) {
      line[key] = matchedLine.content;
    }
  });
  
  return lyricsData;
};

/**
 * 处理本地歌词
 * @param lyric 本地歌词文本
 * @returns 处理后的歌词数据
 */
export const parseLocalLyric = (lyric: string): any => {
  if (!lyric) {
    return createEmptySongLyric();
  }
  
  // 解析
  const lrc: LyricLine[] = parseLrc(lyric);
  const lrcData: any[] = parseLrcData(lrc);
  
  // 处理结果
  const lrcDataParsed: any[] = [];
  
  // 翻译提取
  for (let i = 0; i < lrcData.length; i++) {
    // 当前歌词
    const lrcItem = lrcData[i];
    // 是否具有翻译
    const existingObj = lrcDataParsed.find((v) => v.time === lrcItem.time);
    if (existingObj) {
      existingObj.tran = lrcItem.content;
    } else {
      lrcDataParsed.push(lrcItem);
    }
  }
  
  // 转换为AMLL格式
  const lrcAMData = lrcDataParsed.map((line, index, lines) => ({
    words: [{ startTime: line.time * 1000, endTime: (lines[index + 1]?.time || line.time + 5) * 1000, word: line.content }],
    startTime: line.time * 1000,
    endTime: (lines[index + 1]?.time || line.time + 5) * 1000,
    translatedLyric: line.tran || "",
    romanLyric: line.roma || "",
    isBG: false,
    isDuet: false,
  }));
  
  return {
    lrcData: lrcDataParsed,
    lrcAMData,
    yrcData: [],
    yrcAMData: [],
    hasLrcTran: lrcDataParsed.some(line => line.tran),
    hasYrc: false,
  };
};

/**
 * 解析歌词数据
 * @param lyricData API返回的歌词数据
 * @returns 处理后的歌词数据
 */
export const parseLyricsData = (lyricData: any): any => {
  if (!lyricData || lyricData.code !== 200) {
    return createEmptySongLyric();
  }
  
  let lrcData: any[] = [];
  let yrcData: any[] = [];
  
  // 处理后歌词
  let lrcParseData: LyricLine[] = [];
  let tlyricParseData: LyricLine[] = [];
  let romalrcParseData: LyricLine[] = [];
  let yrcParseData: LyricLine[] = [];
  let ytlrcParseData: LyricLine[] = [];
  let yromalrcParseData: LyricLine[] = [];
  
  // 普通歌词
  if (lyricData?.lrc?.lyric) {
    lrcParseData = parseLrc(lyricData.lrc.lyric);
    lrcData = parseLrcData(lrcParseData);
    
    // 其他翻译
    if (lyricData?.tlyric?.lyric) {
      tlyricParseData = parseLrc(lyricData.tlyric.lyric);
      lrcData = alignLyrics(lrcData, parseLrcData(tlyricParseData), "tran");
    }
    
    if (lyricData?.romalrc?.lyric) {
      romalrcParseData = parseLrc(lyricData.romalrc.lyric);
      lrcData = alignLyrics(lrcData, parseLrcData(romalrcParseData), "roma");
    }
  }
  
  // 逐字歌词
  if (lyricData?.yrc?.lyric) {
    yrcParseData = parseYrc(lyricData.yrc.lyric);
    yrcData = parseYrcData(yrcParseData);
    
    // 其他翻译
    if (lyricData?.ytlrc?.lyric) {
      ytlrcParseData = parseLrc(lyricData.ytlrc.lyric);
      yrcData = alignLyrics(yrcData, parseLrcData(ytlrcParseData), "tran");
    }
    
    if (lyricData?.yromalrc?.lyric) {
      yromalrcParseData = parseLrc(lyricData.yromalrc.lyric);
      yrcData = alignLyrics(yrcData, parseLrcData(yromalrcParseData), "roma");
    }
  }
  
  return {
    lrcData,
    yrcData,
    lrcAMData: parseAMData(lrcParseData, tlyricParseData, romalrcParseData),
    yrcAMData: parseAMData(yrcParseData, ytlrcParseData, yromalrcParseData),
    hasLrcTran: lyricData?.tlyric?.lyric ? true : false,
    hasLrcRoma: lyricData?.romalrc?.lyric ? true : false,
    hasYrc: lyricData?.yrc?.lyric ? true : false,
  };
};

/**
 * 从TTML格式解析歌词并转换为AMLL格式
 * @param ttmlContent TTML格式的歌词内容
 * @returns AMLL格式的歌词行数组
 */
export function parseTTMLToAMLL(ttmlContent: string): AMLLLyricLine[] {
  if (!ttmlContent) {
    return [];
  }

  try {
    // 创建一个临时的DOM解析器来解析TTML内容
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(ttmlContent, 'text/xml');
    
    // 检查解析是否成功
    if (xmlDoc.getElementsByTagName('parsererror').length > 0) {
      return [];
    }

    // 获取所有的p标签（歌词行）
    const pElements = xmlDoc.getElementsByTagName('p');
    if (!pElements || pElements.length === 0) {
      return [];
    }

    // 转换为AMLL格式的歌词行
    const amllLines: AMLLLyricLine[] = [];
    for (let i = 0; i < pElements.length; i++) {
      const p = pElements[i];
      const beginAttr = p.getAttribute('begin');
      const endAttr = p.getAttribute('end');
      
      if (!beginAttr || !endAttr) {
        continue;
      }

      // 解析时间（格式可能是 mm:ss.sss 或 hh:mm:ss.sss）
      const startTime = parseTimeToMs(beginAttr);
      const endTime = Math.max(startTime + 100, parseTimeToMs(endAttr)); // 确保结束时间大于开始时间
      
      if (isNaN(startTime) || isNaN(endTime)) {
        continue;
      }

      // 获取主要歌词内容和翻译/音译内容
      let mainContent = p.textContent?.trim() || '';
      let translatedLyric = '';
      let romanLyric = '';
      
      // 查找翻译和音译标签
      const translationSpan = p.querySelector('.translation');
      const romajiSpan = p.querySelector('.romaji');
      
      if (translationSpan) {
        translatedLyric = translationSpan.textContent?.trim() || '';
        // 从主内容中移除翻译部分
        mainContent = mainContent.replace(translatedLyric, '').trim();
      }
      
      if (romajiSpan) {
        romanLyric = romajiSpan.textContent?.trim() || '';
        // 从主内容中移除音译部分
        mainContent = mainContent.replace(romanLyric, '').trim();
      }

      // 创建AMLL格式的歌词行
      const amllLine: AMLLLyricLine = {
        startTime,
        endTime,
        words: [{
          word: mainContent || '♪',
          startTime,
          endTime
        }],
        translatedLyric,
        romanLyric,
        isBG: false,
        isDuet: false
      };

      amllLines.push(amllLine);
    }

    // 确保歌词行按时间排序
    amllLines.sort((a, b) => a.startTime - b.startTime);

    return amllLines;
  } catch (error) {
    return [];
  }
}

/**
 * 将时间字符串解析为毫秒
 * @param timeStr 时间字符串，格式如 "mm:ss.sss" 或 "hh:mm:ss.sss"
 * @returns 毫秒数
 */
function parseTimeToMs(timeStr: string): number {
  if (!timeStr) return NaN;
  
  // 处理不同格式的时间字符串
  const parts = timeStr.split(':');
  let hours = 0, minutes = 0, seconds = 0;
  
  if (parts.length === 3) {
    // hh:mm:ss.sss 格式
    hours = parseInt(parts[0], 10);
    minutes = parseInt(parts[1], 10);
    seconds = parseFloat(parts[2]);
  } else if (parts.length === 2) {
    // mm:ss.sss 格式
    minutes = parseInt(parts[0], 10);
    seconds = parseFloat(parts[1]);
  } else {
    // 尝试直接解析为秒
    seconds = parseFloat(timeStr);
  }
  
  if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    return NaN;
  }
  
  // 确保返回非负值
  return Math.max(0, (hours * 3600 + minutes * 60 + seconds) * 1000);
}

/**
 * 处理 AM 歌词
 * @param lrcData 主歌词数据
 * @param tranData 翻译歌词数据
 * @param romaData 音译歌词数据
 * @returns AMLL格式的歌词数据
 */
const parseAMData = (lrcData: LyricLine[], tranData?: LyricLine[], romaData?: LyricLine[]): AMLLLyricLine[] => {
  if (!lrcData || !lrcData.length) return [];
  
  return lrcData.map((line, index, lines) => ({
    words: line.words || [],
    startTime: line.words?.[0]?.startTime ?? 0,
    endTime:
      lines[index + 1]?.words?.[0]?.startTime ??
      line.words?.[line.words.length - 1]?.endTime ??
      (line.words?.[0]?.startTime + 5000),
    translatedLyric: tranData?.[index]?.words?.[0]?.word ?? "",
    romanLyric: romaData?.[index]?.words?.[0]?.word ?? "",
    isBG: line.isBG ?? false,
    isDuet: line.isDuet ?? false,
  }));
};