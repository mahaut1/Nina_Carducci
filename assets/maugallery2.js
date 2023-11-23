(function($) {
    $.fn.mauGallery = function(options) {
      var defaults = {
        columns: 3,
        lightBox: true,
        lightboxId: null,
        showTags: true,
        tagsPosition: "bottom",
        navigation: true
      };
      var settings = $.extend({}, defaults, options);
      var gallery = this;
  
      createGallery(gallery, settings);
  
      return this;
    };
  
    function createGallery(gallery, settings) {
      createGalleryStructure(gallery, settings);
      attachEventListeners(gallery, settings);
      showGallery(gallery);
    }
  
    function createGalleryStructure(gallery, settings) {
      gallery.each(function() {
        var $this = $(this);
        createRowWrapper($this);
  
        $this.children(".gallery-item").each(function(index) {
          var $item = $(this);
          responsiveImageItem($item);
          moveItemInRowWrapper($item, $this);
          wrapItemInColumn($item, $this, settings.columns);
        });
  
        if (settings.showTags) {
          showItemTags($this, settings.tagsPosition);
        }
      });
    }
  
    function attachEventListeners(gallery, settings) {
      gallery.on("click", ".gallery-item", function() {
        var $clickedItem = $(this);
        if (settings.lightBox && $clickedItem.prop("tagName") === "IMG") {
          openLightBox($clickedItem, settings.lightboxId);
        }
      });
  
      gallery.on("click", ".nav-link", function() {
        filterByTag($(this), gallery);
      });
  
      gallery.on("click", ".mg-prev", function() {
        prevImage(settings.lightboxId);
      });
  
      gallery.on("click", ".mg-next", function() {
        nextImage(settings.lightboxId);
      });
    }
  
    function createRowWrapper($element) {
      if (!$element.children().first().hasClass("row")) {
        $element.append('<div class="gallery-items-row row"></div>');
      }
    }
  
    function wrapItemInColumn($element, $gallery, columns) {
      if (columns.constructor === Number) {
        var columnSize = Math.ceil(12 / columns);
        $element.wrap(`<div class='item-column mb-4 col-${columnSize}'></div>`);
      } else if (columns.constructor === Object) {
        var columnClasses = "";
        if (columns.xs) {
          columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
        }
        if (columns.sm) {
          columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
        }
        if (columns.md) {
          columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
        }
        if (columns.lg) {
          columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
        }
        if (columns.xl) {
          columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
        }
        $element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
      } else {
        console.error(
          `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
        );
      }
    }
  
    function moveItemInRowWrapper($element, $gallery) {
      $element.appendTo($gallery.find('.gallery-items-row'));
    }
  
    function responsiveImageItem($element) {
      if ($element.prop("tagName") === "IMG") {
        $element.addClass("img-fluid");
      }
    }
  
    function openLightBox($element, lightboxId) {
      // Logique pour ouvrir la lightbox avec l'élément cliqué
    }
  
    function prevImage(lightboxId) {
      // Logique pour afficher l'image précédente dans la lightbox
    }
  
    function nextImage(lightboxId) {
      // Logique pour afficher l'image suivante dans la lightbox
    }
  
    function showItemTags($gallery, position) {
      // Logique pour afficher les tags de la galerie
    }
  
    function filterByTag($clickedTag, $gallery) {
      // Logique pour filtrer les éléments de la galerie par tag
    }
  
  })(jQuery);
  