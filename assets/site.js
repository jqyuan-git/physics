(() => {
  // Preserve older links that selected an archive using a course query parameter.
  if (!document.querySelector('[data-legacy-email-chooser]')) return;
  const course = new URLSearchParams(location.search).get('course');
  const courses = new Set(['physics', 'physics-sl', 'earth-space-science']);
  if (!courses.has(course)) return;
  const link = [...document.querySelectorAll('.course-list a')]
    .find(item => new URL(item.href).pathname.endsWith(`/classes/${course}/emails/index.html`));
  if (link) location.replace(link.href);
})();
