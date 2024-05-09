export const WAVEFORM_DESIGN = {
  container: ".waveform-container",
  waveColor: "#567FFF",
  barGap: 1,
  barWidth: 2,
  barRadius: 2,
  cursorWidth: 3,
  cursorColor: "#567FFF",
  plugins: [
    Minimap.create({
      height: 20,
      waveColor: "#ddd",
      progressColor: "#999",
    }),
    EnvelopePlugin.create({
      volume: 0.5,
      lineColor: "rgba(0, 0, 0, 1)",
      lineWidth: "4",
      dragPointSize: 12,
      dragLine: true,
      dragPointFill: "rgba(255, 255, 255, 1)",
      dragPointStroke: "rgba(0, 0, 0, 0.5)",
    }),
  ],
};
