import type { EventTranslations } from '../../../types/i18n';

// Only the gift-choice event lives here. The per-student reactions
// (new_year_gift_result_*) are in each student's character pack.
export const newYearEventsEn: EventTranslations = {

  new_year_gift: {
    title: 'New Year’s Gift',
    description: [
      'New Year’s Day is almost here. You spend twenty minutes browsing the “New Year Gift Ideas” page of a shopping site, fill your cart with a pile of trendy little junk, then delete it all down to one item.',
      'Everyone in the lab has had a hard year. If you can only pick one person, who gets it?',
    ],
    prompt: 'Give the gift to…',
    options: {
      gift_lin_xiaojuan: {
        text: 'Jamie ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Jamie’s desk.'],
      },
      gift_gu_mianmian: {
        text: 'Mina ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Mina’s desk.'],
      },
      gift_ye_zhiqiu: {
        text: 'Ada ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Ada’s desk.'],
      },
      gift_bai_xiaoman: {
        text: 'Sunny ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Sunny’s desk.'],
      },
      gift_bi_xiaotian: {
        text: 'Theo ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Theo’s desk.'],
      },
      gift_qian_duoduo: {
        text: 'Dorian ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Dorian’s desk.'],
      },
      gift_he_shixu: {
        text: 'Serena ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Serena’s desk.'],
      },
      gift_tang_kuolie: {
        text: 'Nico ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Nico’s desk.'],
      },
      gift_mo_wenxuan: {
        text: 'Orion ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Orion’s desk.'],
      },
      gift_xie_zhiwei: {
        text: 'Zoe ($2K)',
        outcomes: ['The gift, wrapped in a red gift box, is quietly left on Zoe’s desk.'],
      },
      no_gift: {
        text: 'Never mind. The money’s for experiments.',
        outcomes: [
          'You quietly empty the cart. A little later you open it again, stare at it for a few seconds, and close it again. So that’s that, probably.',
        ],
      },
    },
  },

};
