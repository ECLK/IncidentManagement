import React, { useRef } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import LinearProgress from "@material-ui/core/LinearProgress";

import { useLoadingStatus } from "../../loading-spinners/loadingHook";

// Register the plugin
registerPlugin(FilePondPluginFileValidateSize);
registerPlugin(FilePondPluginFileValidateType);

export default function FileUploader({
  files,
  setFiles,
  setFileError,
  watchedActions,
}) {
  const pond = useRef(null);
  const isLoading = useLoadingStatus(watchedActions);
  const FilePondLanguage = {
    labelIdle: `Drag and Drop your files or <span class="filepond--label-action">Browse</span>
            </br><span style="font-size:8pt">maximum upload size is 100MB</span>.
            </br><span style="font-size:8pt">all common video, audio, image and pdf formats are accepted</span>.`,
  };
  const acceptedFileTypes = [
    "application/pdf",
    // "application/zip",
    // "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/x-mpegURL",
    "image/jpeg",
    "image/heic",
    "image/png",
    "video/x-flv",
    "video/mp4",
    "video/MP2T",
    "video/3gpp",
    "video/quicktime",
    "video/x-msvideo",
    "video/x-ms-wmv",
    "audio/basic",
    "auido/L24",
    "audio/mid",
    "audio/mpeg",
    "audio/mp4",
    "audio/x-aiff",
    "audio/x-mpegurl",
    "audio/vnd.rn-realaudio",
    "audio/ogg",
    "audio/vorbis",
    "audio/vnd.wav",
  ];

  return (
    <>
      <FilePond
        ref={pond}
        files={files}
        acceptedFileTypes={["image/*", "audio/*", "video/*", "application/pdf"]}
        allowMultiple={true}
        maxTotalFileSize="100MB"
        {...FilePondLanguage}
        onupdatefiles={(fileItems) => {
          if (fileItems.length == 0) {
            setFileError(false);
          }
          // Set currently active file objects to this.state
          let totalFileSize = fileItems.reduce((totalSize, currFile) => {
            return (totalSize = totalSize + currFile.fileSize);
          }, 0);

          for (var i = 0; i < fileItems.length; i++) {
            if (acceptedFileTypes.includes(fileItems[i].fileType)) {
              setFileError(false);
            } else {
              setFileError(true);
              break;
            }
          }

          if (totalFileSize < 100000000) {
            setFiles(fileItems.map((fileItem) => fileItem.file));
          }
        }}
      />
      {isLoading && <LinearProgress />}
    </>
  );
}
