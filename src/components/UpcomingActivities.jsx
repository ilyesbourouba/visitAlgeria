import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';
import { fetchAPI, localize, mediaUrl } from '../services/api';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './UpcomingActivities.css';

gsap.registerPlugin(ScrollTrigger);

const fallbackActivities = [
  {
    nameKey: 'uaNameSahara', descKey: 'uaDescSahara', dateKey: 'uaDateSahara',
    tags: ['uaTagFestival', 'uaTagCulture'],
    image: 'https://images.unsplash.com/photo-1575664274476-e02d99195164?q=80&w=1931&auto=format&fit=crop'
  },
  {
    nameKey: 'uaNameTimgad', descKey: 'uaDescTimgad', dateKey: 'uaDateTimgad',
    tags: ['uaTagMusic', 'uaTagHeritage'],
    image: 'https://images.unsplash.com/photo-1549145177-238518f1ec1a?q=80&w=687&auto=format&fit=crop'
  },
  {
    nameKey: 'uaNameCoastal', descKey: 'uaDescCoastal', dateKey: 'uaDateCoastal',
    tags: ['uaTagBeach', 'uaTagNature'],
    image: 'https://images.unsplash.com/photo-1642088995585-e97a4af093ef?q=80&w=687&auto=format&fit=crop'
  }
];

const UpcomingActivities = ({ onViewAll, onSelectEvent }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const isRTL = language === 'ar';
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [apiEvents, setApiEvents] = useState(null);

  useEffect(() => {
    fetchAPI('/events').then(data => {
      if (data && data.length > 0) {
        // Show only featured/active events, limit to 3
        const active = data.filter(e => e.is_active && e.is_featured).sort((a, b) => a.sort_order - b.sort_order);
        if (active.length > 0) setApiEvents(active.slice(0, 3));
      }
    });
  }, []);

  const activities = apiEvents
    ? apiEvents.map(e => ({
        name: localize(e, 'title', language),
        desc: localize(e, 'description', language),
        date: e.date_start ? new Date(e.date_start).toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '',
        tags: e.categories ? e.categories.map(cat => language === 'ar' ? (cat.name_ar || cat.name_en) : (cat.name_en || cat.name_ar)) : [],
        image: e.image_url ? mediaUrl(e.image_url) : '',
        _fromApi: true,
        _event: e,
      }))
    : fallbackActivities.map(a => ({
        name: t(a.nameKey),
        desc: t(a.descKey),
        date: t(a.dateKey),
        tags: a.tags.map(tk => t(tk)),
        image: a.image,
        _fromApi: false,
      }));

  useEffect(() => {
    const sections = gsap.utils.toArray('.ua-activity-slide');

    if (sections.length === 0) return;

    sections.forEach((section, i) => {
      const isLast = i === sections.length - 1;

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        pin: true,
        pinSpacing: isLast,
        scrub: true,
      });

      // Animate the image
      gsap.fromTo(
        section.querySelector('.ua-activity-image img'),
        { scale: 0.85, opacity: 0, y: 60 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top top',
            scrub: 1,
          },
        }
      );

      // Animate the content
      gsap.fromTo(
        section.querySelector('.ua-activity-content'),
        { x: isRTL ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // Animate the big number
      gsap.fromTo(
        section.querySelector('.ua-activity-number'),
        { y: -50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [language, isRTL, activities]);

  return (
    <section className="ua-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="ua-header">
        <span className="ua-badge">{t('uaBadge')}</span>
        <h2 className="ua-headline">{t('uaHeadline')}</h2>
      </div>

      {/* Activity Slides */}
      <div className="ua-slides-container" ref={containerRef}>
        {activities.map((activity, index) => (
          <div key={index} className="ua-activity-slide" id={`ua-activity-${index + 1}`}>
            {/* Left: Image */}
            <div className="ua-activity-visual">
              <span className="ua-activity-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="ua-activity-image">
                <img src={activity.image} alt={activity.name} />
              </div>
            </div>

            {/* Right: Content */}
            <div className="ua-activity-content">
              <div className="ua-activity-tags">
                {activity.tags.map((tag, i) => (
                  <span key={i} className="ua-activity-tag">{tag}</span>
                ))}
              </div>
              <h3 className="ua-activity-name">{activity.name}</h3>
              <p className="ua-activity-description">{activity.desc}</p>
              <div className="ua-activity-date">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{activity.date}</span>
              </div>
              <button
                className="ua-activity-explore-btn"
                onClick={(e) => {
                  e.preventDefault();
                  if (activity._fromApi && activity._event && onSelectEvent) {
                    onSelectEvent(activity._event);
                  } else if (onViewAll) {
                    onViewAll();
                  }
                }}
              >
                {t('uaExploreBtn')} <span>→</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="ua-footer">
        <button className="ua-view-all-btn" onClick={onViewAll}>
          {t('uaViewAllBtn')} <span>→</span>
        </button>
      </div>
    </section>
  );
};

export default UpcomingActivities;
