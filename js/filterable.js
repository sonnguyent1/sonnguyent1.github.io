$(document).ready(function() {
  let $grid = $('.is-filterable-grid');
  let $items = $grid.children('.card');
  let currentCat = 'all';
  let sidebar = [];
  let sortItems = (a,b) => {
    let an = a.getAttribute('data-order');
    let bn = b.getAttribute('data-order');
    if(an > bn) { return 1; }
    if(an < bn) { return -1; }
    return 0;
  }
  let filterItems = function() {
    let cat = this.getAttribute('data-category');
    let newSidebar = [];
    $('.button--is-active').toggleClass('button--is-active');
    $(`.button[data-category=${cat}]`).toggleClass('button--is-active');
    $grid.fadeOut( "1", function() {
      sidebar.map((item) => $(item).appendTo($grid));
      if(cat === 'all') {
        $items.sort(sortItems).detach().appendTo($grid);
      } else {
        $(`.card:not([data-category=${cat}])`).each(function() {
          newSidebar.push($(this).detach());
        });
      }
      sidebar = newSidebar;
      currentCat = cat;
    }).fadeIn("50");
  };
  // Handle the click on a category filter button
  $('.js-button-filter').click(filterItems);
});