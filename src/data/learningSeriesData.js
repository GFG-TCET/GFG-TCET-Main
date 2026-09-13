import systemDesignBanner from '../assets/system-design-self-learning.png';
import systemDesignPreview from '../assets/system-design-self-learning-full-preview.png';

export const learningSeriesData = [
  {
    id: 'system-design',
    title: 'System Design — Self Learning Series',
    description: 'Level up your engineering skills and master the art of scalable architecture! The System Design Learning Series is a structured roadmap designed to take you from core foundational concepts to designing complex, production-ready systems. You will learn to navigate critical building blocks—like load balancing, caching, and database sharding—while mastering real-world case studies like Netflix and Uber.',
    banner: systemDesignBanner,
    previewBanner: systemDesignPreview,
    status: 'in-progress',
    startDate: '2026-09',
    featured: true,
resources: [
      {
        id: 'module-1-foundation-of-scalable-and-architectural',
        title: 'Foundation of Scallable and artitechtural',
        type: 'PDF',
        relatedTopic: 'module-1',
        topicTitle: 'Module 1',
        url: '/resources/system-design/module-1/foundation-of-scalable-and-architectural.pdf',
        completed: false,
      },
    ],
  },
];

export const getAllResources = (seriesList = learningSeriesData) => seriesList.flatMap(series =>
  (series.resources || []).map(resource => ({ ...resource, relatedSeries: series.id }))
);
