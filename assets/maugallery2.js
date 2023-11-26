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
      var imageUrl = $element.attr("src");
      $("#" + lightboxId)
        .find(".lightboxImage")
        .attr("src", imageUrl);
      $("#" + lightboxId).modal("toggle");
    }
    
  
    function prevImage(lightboxId) {
      var $lightboxImage = $("#" + lightboxId).find(".lightboxImage");
      var currentImageSrc = $lightboxImage.attr("src");
      var $galleryImages = $(".gallery").find(".gallery-item img");
      var currentIndex = $galleryImages.index($galleryImages.filter('[src="' + currentImageSrc + '"]'));
    
      var prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = $galleryImages.length - 1;
      }
    
      var prevImageSrc = $galleryImages.eq(prevIndex).attr("src");
      $lightboxImage.attr("src", prevImageSrc);
    }
    
  
    function nextImage(lightboxId) {
      var $lightbox = $("#" + lightboxId);
      var $lightboxImage = $lightbox.find(".lightboxImage");
      var imagesArray = $lightbox.data("imagesArray");
      var currentIndex = $lightbox.data("currentIndex");
    
      var nextIndex = (currentIndex + 1) % imagesArray.length;
      var nextImageSrc = imagesArray[nextIndex];
      $lightboxImage.attr("src", nextImageSrc);
    
      $lightbox.data("currentIndex", nextIndex);
    }
    
  
    function showItemTags($gallery, position) {
      var tagsCollection = [];
    
      // Collecter les tags uniques de la galerie
      $gallery.find(".gallery-item").each(function() {
        var tag = $(this).data("gallery-tag");
        if (tag && tagsCollection.indexOf(tag) === -1) {
          tagsCollection.push(tag);
        }
      });
    
      // Créer l'élément HTML pour afficher les tags
      var tagItems = '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all">Tous</span></li>';
      $.each(tagsCollection, function(index, value) {
        tagItems += `<li class="nav-item active"><span class="nav-link" data-images-toggle="${value}">${value}</span></li>`;
      });
      var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;
    
      // Afficher les tags en fonction de la position spécifiée
      if (position === "bottom") {
        $gallery.append(tagsRow);
      } else if (position === "top") {
        $gallery.prepend(tagsRow);
      } else {
        console.error(`Unknown tags position: ${position}`);
      }
    }
    
  
    function filterByTag($clickedTag, $gallery) {
      var tag = $clickedTag.data("images-toggle");
    
      $gallery.find(".gallery-item").each(function() {
        var $item = $(this);
        var itemTag = $item.data("gallery-tag");
        if (tag === "all" || tag === itemTag) {
          $item.parents(".item-column").show(300);
        } else {
          $item.parents(".item-column").hide(300);
        }
      });
    
      $clickedTag.addClass("active-tag").siblings().removeClass("active-tag");
    }
    
  
  })(jQuery);
  