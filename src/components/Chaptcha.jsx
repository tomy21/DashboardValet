import React, { useEffect, useRef, useState } from "react";

function Captcha() {
  const [captchaText, setCaptchaText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    initializeCaptcha(ctx);
  }, []);

  const generateRandomChar = (characters) =>
    characters.charAt(Math.floor(Math.random() * characters.length));

  const generateCaptchaText = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 4; i++) {
      captcha += generateRandomChar(characters);
    }
    return captcha;
  };

  const drawCaptchaOnCanvas = (ctx, captcha) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
    const letterSpace = 150 / captcha.length;
    for (let i = 0; i < captcha.length; i++) {
      const xInitialSpace = 25;
      ctx.font = "20px Poppins";
      ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
      ctx.fillText(
        captcha[i],
        xInitialSpace + i * letterSpace,
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
  };

  const initializeCaptcha = (ctx) => {
    setUserInput("");
    setErrorMessage("");
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCaptchaSubmit = () => {
    if (userInput.toUpperCase() === captchaText.toUpperCase()) {
      alert("Success");
    } else {
      setErrorMessage("Captcha Incorrect");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      initializeCaptcha(ctx);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="wrapper">
          <canvas ref={canvasRef} width="200" height="70"></canvas>
          <button
            id="reload-button"
            onClick={() =>
              initializeCaptcha(canvasRef.current.getContext("2d"))
            }
          >
            Reload
          </button>
        </div>
        <input
          type="text"
          id="user-input"
          placeholder="Enter the text in the image"
          value={userInput}
          onChange={handleUserInputChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button id="submit-button" onClick={handleCaptchaSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Captcha;
