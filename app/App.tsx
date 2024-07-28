import React from "react";
import { WaveFileFileFormat, parse_wave } from "../pkg/musica";

export default function App() {
  return (
    <main className="flex flex-col bg-gray-800 h-screen w-screen">
      <Header></Header>
      <UploadFileDialogBox></UploadFileDialogBox>
    </main>
  );
}

function Header() {
  return (
    <header className="bg-gray-900 text-white text-center py-5 border-b-4 border-black">
      <h1 className="text-4xl mb-2 tracking-widest">Musica</h1>
      <div className="text-xl italic">
        Discover the Pinnacle of WAV Parsing – Exclusively Here!
      </div>
    </header>
  );
}

function UploadFileDialogBox() {
  const uploadFileDom = React.useRef<HTMLInputElement | null>(null);
  const [arrayBuffer, updateArrayBuffer] = React.useState<ArrayBuffer | null>(
    null
  );

  const [parsedDetails, updateParsedDetails] =
    React.useState<WaveFileFileFormat | null>(null);

  React.useEffect(() => {
    if (arrayBuffer) {
      try {
        let result = parse_wave(arrayBuffer);
        updateParsedDetails(result);
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    } else {
      updateParsedDetails(null);
    }
  }, [arrayBuffer]);

  let tryReadAndProcess = () => {
    let dom = uploadFileDom.current;
    if (dom && dom.files?.length) {
      dom.files[0]
        .arrayBuffer()
        .then(updateArrayBuffer)
        .catch((err) => {
          console.error(err);
          alert("Unable to read the file!! ");
          dom.value = "";
        });
    } else {
      alert("No file is selected");
    }
  };
  return (
    <div className="flex flex-col self-center">
      <div className="flex flex-col md:flex-row self-center my-6 p-4 md:space-x-4 space-y-4 md:space-y-0 rounded border border-white">
        <input
          className="text-white rounded border border-gray-600 file:bg-blue-500 file:text-white file:font-bold file:py-2 file:px-4 file:rounded hover:file:bg-blue-600"
          accept=".wav"
          type="file"
          id="fileUpload"
          ref={uploadFileDom}
        />
        <button
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600"
          onClick={tryReadAndProcess}
        >
          Process
        </button>
        <button
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600"
          onClick={(_) => {
            if (uploadFileDom.current) uploadFileDom.current.value = "";
            updateArrayBuffer(null);
          }}
        >
          Clear
        </button>
      </div>

      {parsedDetails == null ? (
        <div></div>
      ) : (
        <ShowParsedDetail data={parsedDetails}></ShowParsedDetail>
      )}
    </div>
  );
}

function ShowParsedDetail({ data }: { data: WaveFileFileFormat }) {
  return (
    <div className="flex flex-col ">
      <table className="text-sm text-left rtl:text-right border text-gray-500">
        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Fields
            </th>
            <th scope="col" className="px-6 py-3">
              Values
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ChunkID
            </th>
            <th>{data.chunk_id}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ChunkSize
            </th>
            <th>{data.chunk_size}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Format
            </th>
            <th>{data.format}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Subchunk1ID
            </th>
            <th>{data.subchunk1_id}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Subchunk1Size
            </th>
            <th>{data.subchunk1_size}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              AudioFormat
            </th>
            <th>{data.audio_format}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              NumChannels
            </th>
            <th>{data.num_channels}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              SampleRate
            </th>
            <th>{data.sample_rate}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ByteRate
            </th>
            <th>{data.byte_rate}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              BlockAlign
            </th>
            <th>{data.block_align}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              BitsPerSample
            </th>
            <th>{data.bits_per_sample}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Subchunk2ID
            </th>
            <th>{data.subchunk2_id}</th>
          </tr>
          <tr>
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Subchunk2Size
            </th>
            <th>{data.subchunk2_size}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
