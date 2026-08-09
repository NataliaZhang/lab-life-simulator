// Achievement (成就) — cross-run permanent collectibles shown in the Gallery.
// Unlocking is detected in the view layer (see engine/achievements.ts) and persisted
// via GalleryData.achievementsUnlocked, mirroring how endings/max-favor are tracked.

export interface AchievementDefinition {
  id: string;
  /** Path relative to Vite BASE_URL (e.g. 'img/students/illustration/max_favor/foo.PNG'). */
  image: string;
  /** 3–8 个字的精炼标题，解锁横幅与图鉴中都会展示。 */
  title: string;
  /** 达成标准说明，展示在图鉴卡片中标题下方。 */
  criteria: string;
}
