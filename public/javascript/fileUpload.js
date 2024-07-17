FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginImageCrop,
    FilePondPluginImageResize,
    FilePondPluginFileEncode);
const inputElement = document.querySelector('input[type="file"]');
FilePond.create(
    inputElement,
    {
      labelIdle: `Drag & Drop your picture or <span class="filepond--label-action">Browse</span>`,
      imagePreviewHeight: 100,
      imageCropAspectRatio: 1,
      imageResizeTargetWidth: 100,
      imageResizeTargetHeight: 100,
      stylePanelLayout: 'compact integrated',
      styleLoadIndicatorPosition: 'center',
      styleProgressIndicatorPosition: 'right bottom',
      styleButtonRemoveItemPosition: 'left bottom',
      styleButtonProcessItemPosition: 'right bottom',
    }
  );

FilePond.parse(document.body);