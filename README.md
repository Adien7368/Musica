
# Musica

**Musica** is a project that aims to parse and play WAV files using a web development component written in Rust and an Arduino setup for playing WAV files.

## Features

- **Rust Web Component**: Parses and plays WAV files in a web environment.
- **Arduino Component**: Parses and plays WAV files using Arduino.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Rust Web Component](#rust-web-component)
  - [Arduino Component](#arduino-component)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Rust Web Component

1. **Prerequisites**: Ensure you have [Rust](https://www.rust-lang.org/tools/install) and [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) installed.

2. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/musica.git
   cd musica/web
   ```

3. Build the project:

   ```sh
   cargo build --release
   ```

### Arduino Component

1. **Prerequisites**: Ensure you have the [Arduino IDE](https://www.arduino.cc/en/software) installed.

2. Connect your Arduino board to your computer.

3. Open the `musica/arduino/musica.ino` file in the Arduino IDE.

4. Upload the code to your Arduino board.

## Usage

### Rust Web Component

1. Start the Rust web server:

   ```sh
   cargo run --release
   ```

2. Open your web browser and navigate to `http://localhost:8000`.

3. Upload a WAV file and enjoy the playback.

### Arduino Component

1. Ensure your Arduino board is powered on and connected to a speaker.

2. The WAV file will play automatically once the Arduino is powered up and the code is running.

## Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
