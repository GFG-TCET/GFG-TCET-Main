import { EventCard, EventBanner } from './EventCard';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, FileText, ExternalLink } from 'lucide-react';
import { learningSeriesData, getAllResources } from '../data/learningSeriesData';

const panel = 'bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6';
const heading = 'text-xl font-bold text-gray-900 dark:text-white mb-4';
const body = 'text-gray-600 dark:text-gray-400';
const action = 'inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-green-600';
const statusLabels = { 'in-progress': 'In Progress', completed: 'Completed', upcoming: 'Upcoming' };

function Notes({ notes }) {
  if (!notes?.length) return null;
  return Array.isArray(notes) ? <ul className={`list-disc pl-5 space-y-2 ${body}`}>{notes.map((note, index) => <li key={index}>{note}</li>)}</ul> : <p className={body}>{notes}</p>;
}

export function LearningSeriesCard({ series, onImageClick }) {
  return (
    <EventCard>
      {series.banner && <EventBanner src={series.banner} previewSrc={series.previewBanner} title={series.title} onClick={onImageClick} />}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Self-paced learning</span>
          {series.status && <span className="text-gray-500 dark:text-gray-400 text-sm">{statusLabels[series.status] || series.status}</span>}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{series.title}</h3>
        {series.description && <p className={`${body} mb-4 leading-relaxed flex-grow`}>{series.description}</p>}
        <div className="space-y-2 mb-6">
          {series.startDate && <p className={`flex items-center text-sm ${body}`}><Calendar className="w-4 h-4 mr-2 shrink-0" />{formatDate(series.startDate)}</p>}
          <p className={`flex items-center text-sm ${body}`}><Clock className="w-4 h-4 mr-2 shrink-0" />Self-paced</p>
        </div>
        <Link to={`?tab=learning&series=${encodeURIComponent(series.id)}`} className={`w-full py-3 px-4 rounded-lg font-semibold text-center inline-flex items-center justify-center gap-2 mt-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300`} aria-label={`Explore ${series.title}`}>Explore Series <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </EventCard>
  );
}

export function ResourceList({ resources, emptyMessage = 'No resources added yet. Resources will appear here as the learning series progresses.' }) {
  if (!resources.length) return <p className={`${body} py-4`}>{emptyMessage}</p>;
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{resources.map(resource => {
    const series = learningSeriesData.find(item => item.id === resource.relatedSeries);
    const topic = series?.topics?.find(item => item.id === resource.relatedTopic);
    const isPdf = resource.type === 'PDF';
    const Icon = isPdf ? FileText : BookOpen;
    return <article key={`${resource.relatedSeries}:${resource.id}`} className="min-w-0 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
      <div className="flex gap-3 items-start"><Icon className="w-5 h-5 shrink-0 text-green-600 dark:text-green-400 mt-1" /><h4 className="font-semibold text-gray-900 dark:text-white break-words">{resource.title}</h4></div>
      <div className={`flex flex-wrap gap-2 text-sm ${body}`}><span>{resource.type}</span>{resource.source && <span>· {resource.source}</span>}{resource.completed && <span className="text-green-700 dark:text-green-300">· Completed</span>}</div>
      {series && <p className={`text-sm ${body}`}>{series.title}</p>}
      {topic && <p className={`text-sm ${body}`}>Topic: {topic.title}</p>}
      {resource.description && <p className={`text-sm ${body}`}>{resource.description}</p>}
      {resource.url && <a href={resource.url} target="_blank" rel="noopener noreferrer" className={action}>{isPdf ? 'View PDF' : 'Open Resource'}<ExternalLink className="w-4 h-4" /><span className="sr-only"> (opens in a new tab)</span></a>}
    </article>;
  })}</div>;
}

function ModuleResources({ resources }) {
  if (!resources.length) return <ResourceList resources={resources} />;
  const modules = [];
  const general = [];
  for (const resource of resources) {
    if (resource.relatedTopic) {
      const existing = modules.find(module => module.id === resource.relatedTopic);
      if (existing) {
        existing.items.push(resource);
      } else {
        modules.push({ id: resource.relatedTopic, title: resource.topicTitle || resource.relatedTopic, items: [resource] });
      }
    } else {
      general.push(resource);
    }
  }
  return <div className="space-y-6">
    {modules.map(module => (
      <section key={module.id} className="space-y-3"><h4 className="font-semibold text-gray-900 dark:text-white">{module.title}</h4><ResourceList resources={module.items} /></section>
    ))}
    {!!general.length && <section className="space-y-3"><h4 className="font-semibold text-gray-900 dark:text-white">General Resources</h4><ResourceList resources={general} /></section>}
  </div>;
}

const formatDate = value => new Date(`${value.length === 7 ? `${value}-01` : value}T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', ...(value.length > 7 ? { day: 'numeric' } : {}) });

function SeriesDetail({ series }) {
  const resources = getAllResources([series]);
  return <div className="space-y-8">
    <Link to="/events" className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-medium"><ArrowLeft className="w-4 h-4" />Back</Link>
    <section className={panel}>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">{series.title}</h2>
      <div className={`flex flex-wrap gap-3 text-sm mb-6 ${body}`}><span>Self-paced learning</span>{series.status && <span>{statusLabels[series.status] || series.status}</span>}{series.startDate && <span>Started {formatDate(series.startDate)}</span>}{series.endDate && <span>Ends {formatDate(series.endDate)}</span>}</div>
      {series.description && <><h3 className={heading}>Overview</h3><p className={`${body} leading-relaxed mb-6`}>{series.description}</p></>}
    </section>
    <section className={panel}><h3 className={heading}>Resources</h3><ModuleResources resources={resources} /></section>
    {!!series.notes?.length && <section className={panel}><h3 className={heading}>Notes</h3><Notes notes={series.notes} /></section>}
  </div>;
}

export function LearningSeriesSection({ selectedSeries, onImageClick }) {
  const series = learningSeriesData.find(item => item.id === selectedSeries);
  return series ? <SeriesDetail series={series} /> : <div className="space-y-6"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Learning Series</h2>{selectedSeries && <p className={body}>Learning series not found. Explore the available series below.</p>}<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">{learningSeriesData.map(item => <LearningSeriesCard key={item.id} series={item} onImageClick={onImageClick} />)}</div></div>;
}
