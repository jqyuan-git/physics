(() => {
  const form = document.querySelector('[data-archive-filters]');
  if (!form) return;
  const year = form.querySelector('[name="year"]');
  const course = form.querySelector('[name="course"]');
  const search = form.querySelector('[name="search"]');
  const rows = [...document.querySelectorAll('[data-email-entry]')];
  const groups = [...document.querySelectorAll('[data-year-group]')];
  const status = document.querySelector('[data-filter-status]');
  const empty = document.querySelector('[data-filter-empty]');
  const params = new URLSearchParams(location.search);
  if ([...course.options].some(option => option.value === params.get('course'))) course.value = params.get('course');
  function apply() {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    for (const row of rows) {
      row.hidden = Boolean((year.value && row.dataset.year !== year.value) || (course.value && row.dataset.course !== course.value) || (query && !row.textContent.toLocaleLowerCase().includes(query)));
      if (!row.hidden) count++;
    }
    for (const group of groups) group.hidden = ![...group.querySelectorAll('[data-email-entry]')].some(row => !row.hidden);
    empty.hidden = count !== 0;
    status.textContent = `${count} ${count === 1 ? 'email' : 'emails'} shown`;
  }
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', apply);
  form.addEventListener('change', apply);
  apply();
})();
