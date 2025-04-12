<template>
<SongDetail ref="songDetailRef" />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import SongDetail from '@/components/Modal/SongDetail.vue';

const router = useRouter();
const songDetailRef = ref(null);

onMounted(() => {
  const songId = router.currentRoute.value.query.id;
  if (songId) {
    // 检查历史记录
    if (window.history.length > 1) {
      router.back();
      songDetailRef.value?.openDetail(songId);
    } else {
      router.push('/');
      songDetailRef.value?.openDetail(songId);
    }
  }
});
</script>