mod utils;

use js_sys::{ArrayBuffer, DataView, JsString, Number};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, Muica!");
}

// TODO: Complete testing part and use this format
struct WaveMetadata {
    filename: JsString,
    nb_streams: Number,       // 1
    nb_programs: Number,      // 0
    nb_stream_groups: Number, //0
    format_name: String,      // "wav"
    format_long_name: String, // "WAV / WAVE (Waveform Audio)",
    duration: String,         //"3.000000",
    size: String,             //"132344",
    bit_rate: String,         // "352917",
    probe_score: Number,      //99
}

#[wasm_bindgen]
pub struct WaveFileFileFormat {
    chunk_id: u32,
    pub chunk_size: u32,
    format: u32,
    subchunk1_id: u32,
    pub subchunk1_size: u32,
    pub audio_format: u16,
    pub num_channels: u16,
    pub sample_rate: u32,
    pub byte_rate: u32,
    pub block_align: u16,
    pub bits_per_sample: u16,
    subchunk2_id: u32,
    pub subchunk2_size: u32,
}

fn u32to_string(s: u32) -> [char; 4] {
    let mut result = [
        ((s & 127) as u8 as char),
        (((s >> 8) & 127) as u8 as char),
        (((s >> 16) & 127) as u8 as char),
        (((s >> 24) & 127) as u8 as char),
    ];
    result.reverse();

    return result;
}

#[wasm_bindgen]
impl WaveFileFileFormat {
    #[wasm_bindgen(getter)]
    pub fn chunk_id(&self) -> JsString {
        let s: String = u32to_string(self.chunk_id).iter().collect();
        return From::from(s);
    }

    #[wasm_bindgen(getter)]
    pub fn subchunk1_id(&self) -> JsString {
        let s: String = u32to_string(self.subchunk1_id).iter().collect();
        return From::from(s);
    }
    #[wasm_bindgen(getter)]
    pub fn subchunk2_id(&self) -> JsString {
        let s: String = u32to_string(self.subchunk2_id).iter().collect();
        return From::from(s);
    }
    #[wasm_bindgen(getter)]
    pub fn format(&self) -> JsString {
        let s: String = u32to_string(self.format).iter().collect();
        return From::from(s);
    }
}

fn get32bit(offset: usize, data_view: &DataView, endian: bool) -> u32 {
    if endian {
        return (data_view.get_uint8(offset + 0) as u32) << 24
            | (data_view.get_uint8(offset + 1) as u32) << 16
            | (data_view.get_uint8(offset + 2) as u32) << 8
            | (data_view.get_uint8(offset + 3) as u32);
    } else {
        return (data_view.get_uint8(offset + 3) as u32) << 24
            | (data_view.get_uint8(offset + 2) as u32) << 16
            | (data_view.get_uint8(offset + 1) as u32) << 8
            | (data_view.get_uint8(offset + 0) as u32);
    }
}

fn get16bit(offset: usize, data_view: &DataView, endian: bool) -> u16 {
    if endian {
        return (data_view.get_uint8(offset + 0) as u16) << 8
            | (data_view.get_uint8(offset + 1) as u16);
    } else {
        return (data_view.get_uint8(offset + 1) as u16) << 8
            | (data_view.get_uint8(offset + 0) as u16);
    }
}

#[wasm_bindgen]
pub fn parse_wave(data: &ArrayBuffer) -> WaveFileFileFormat {
    let data_view = DataView::new(data, 0, 44);

    let result = WaveFileFileFormat {
        chunk_id: get32bit(0, &data_view, true),
        chunk_size: get32bit(4, &data_view, false),
        format: get32bit(8, &data_view, true),
        subchunk1_id: get32bit(12, &data_view, true),
        subchunk1_size: get32bit(16, &data_view, false),
        audio_format: get16bit(20, &data_view, false),
        num_channels: get16bit(22, &data_view, false),
        sample_rate: get32bit(24, &data_view, false),
        byte_rate: get32bit(28, &data_view, false),
        block_align: get16bit(32, &data_view, false),
        bits_per_sample: get16bit(34, &data_view, false),
        subchunk2_id: get32bit(36, &data_view, true),
        subchunk2_size: get32bit(40, &data_view, false),
    };
    // let metaData = [
    //     ("ChunkID", 'b', 4),
    //     ("ChunkSize", 'l', 4),
    //     ("Format", 'b', 4),
    //     ("Subchunk1 ID", 'b', 4),
    //     ("Subchunk1 Size", 'l', 4),
    //     ("Audio Format", 'l', 2),
    //     ("Num Channels", 'l', 2),
    //     ("Sample Rate", 'l', 4),
    //     ("Byte Rate", 'l', 4),
    //     ("BlockAlign", 'l', 2),
    //     ("Bits Per Sample", 'l', 2),
    //     ("Subchunk2 ID", 'b', 4),
    //     ("Subchunk2 Size", 'l', 4),
    // ];
    // let mut offerByte = 0;
    // let result = metaData.map(|(field, edian, size)| {
    //     for i in [0..size] {
    //         let val = (1 << 4 - 1) & dataView.get_uint16_endian(offerByte, edian == 'l');
    //         offerByte += size;
    //         return (field.to_string(), format!("{:b}", val));
    //     }
    // });

    return result;
}
