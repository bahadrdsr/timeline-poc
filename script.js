const events = [
  {
    name: "Event One",
    briefDescription: "This is the first major event.",
    timeOccurred: "Year 100",
    xPosition: 100, // Example position
    yPosition: 50, // Centered on the line
  },
  {
    name: "Event Two",
    briefDescription: "A significant occurrence in the second era.",
    timeOccurred: "Year 200",
    xPosition: 200, // Example position
    yPosition: 50, // Centered on the line
  },
  {
    name: "Event Three",
    briefDescription: "An important milestone in the timeline.",
    timeOccurred: "Year 300",
    xPosition: 300, // Example position
    yPosition: 50, // Centered on the line
  },
];

const app = new PIXI.Application({
  width: window.innerWidth, // Initial width
  height: window.innerHeight, // Initial height
  backgroundColor: 0xf3eac2, // Parchment color in hex
  resolution: window.devicePixelRatio,
  autoDensity: true,
  resizeTo: window,
});

function drawTimeline() {
  // Drawing the timeline
  let graphics = new PIXI.Graphics();
  graphics.lineStyle({
    width: 6,
    color: 0x3b2f2f,
    alpha: 1,
  });

  const centerY = app.screen.height / 2;
  graphics.moveTo(40, centerY);
  graphics.lineTo(3000, centerY);

  app.stage.addChild(graphics);

  events.forEach((event) => {
    let container = new PIXI.Container();
    container.x = event.xPosition;
    container.y = app.screen.height / 2;
    container.interactive = true;
    container.buttonMode = true;

    let dot = new PIXI.Graphics();
    dot.beginFill(0x000000); // Black dot
    dot.drawCircle(0, 0, 10); // Centered in the container
    dot.endFill();

    container.addChild(dot);
    container.eventData = event; // Store the event data

    // Add hover effect
    container.on("mouseover", () => {
      gsap.to(container.scale, { duration: 0.3, x: 1.5, y: 1.5 }); // Enlarge container
    });

    container.on("mouseout", () => {
      gsap.to(container.scale, { duration: 0.3, x: 1, y: 1 }); // Reset container size
    });

    // Click to display information
    container.on("click", () => {
      displayEventInfo(event);
    });

    app.stage.addChild(container);
  });
}

function displayEventInfo(event) {
  // Remove existing info text if any
  // ...

  // Create a new text element for the event information
  const centerY = app.screen.height / 2;
  let infoText = new PIXI.Text(
    `${event.name}\n${event.briefDescription}\n${event.timeOccurred}`,
    {
      fontFamily: "Arial",
      fontSize: 12,
      fill: 0x000000,
      align: "center",
      wordWrap: true,
      wordWrapWidth: 100,
    }
  );

  // Position the text near the event dot
  infoText.x = event.xPosition + 20; // Adjust as needed
  infoText.y = centerY - 20; // Adjust as needed

  app.stage.addChild(infoText);
}

drawTimeline();

document.getElementById("app-container").appendChild(app.view);
