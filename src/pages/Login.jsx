import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cryptoJs from "crypto-js";
import axios from "axios";

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [passInput, setPassInput] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State untuk menangani loading
  const canvasRef = useRef(null);
  const key = "PARTNER_KEY";
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    initializeCaptcha(ctx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateRandomChar = (min, max) =>
    String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

  const generateCaptchaText = () => {
    let captcha = "";
    for (let i = 0; i < 3; i++) {
      captcha += generateRandomChar(65, 90);
      captcha += generateRandomChar(97, 122);
      captcha += generateRandomChar(48, 57);
    }
    return captcha
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
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

        // Randomize Y position slightly
        Math.floor(Math.random() * 16 + 25),
        100
      );
    }
  };

  const initializeCaptcha = (ctx) => {
    setUserInput("");
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    drawCaptchaOnCanvas(ctx, newCaptcha);
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleCaptchaSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Aktifkan loading ketika form dikirim
    if (userInput === captchaText) {
      try {
        const dataLogin = {
          email: userEmail,
          password: passInput,
        };
        const encrypData = cryptoJs.AES.encrypt(
          JSON.stringify(dataLogin),
          key
        ).toString();
        const response = await axios.post(
          "http://147.139.135.195:8090/api/login",
          {
            data: encrypData,
          },
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        const decryptedData = cryptoJs.AES.decrypt(
          response.data.data,
          key
        ).toString(cryptoJs.enc.Utf8);

        const userData = JSON.parse(decryptedData);
        if (userData.SetupRoleId === 5) {
          localStorage.setItem("token", token);
          localStorage.setItem("role", userData.SetupRoleId);
          localStorage.setItem("email", userData.Email);
          localStorage.setItem("username", userData.Username);
          setIsLoggedIn(true);
          navigate("/dashboard");
        } else {
          setError("User does not have permission to access the dashboard");
        }
      } catch (error) {
        setError("Invalid email or password");
      }
    } else {
      setError("Captcha Incorrect");
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      initializeCaptcha(ctx);
    }
    setLoading(false); // Matikan loading setelah proses selesai
  };

  if (isLoggedIn) {
    return <Link to="/dashboard" />;
  }

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center gap-y-5 p-24">
        <div className="border border-zinc-300 shadow-xl p-3 rounded-md w-96 h-100%">
          <div className="flex flex-row justify-start items-end gap-x-4 mb-5 border-b border-stone-400 pb-3">
            <img
              src={"/assets/logo512.png"}
              alt="Logo Valet"
              width={50}
              height={50}
            />
            <h1 className="text-3xl font-semibold">SKY Valet</h1>
          </div>
          {error && (
            <p className="text-red-800 bg-red-100 px-3 py-2 rounded-md ">
              {error}
            </p>
          )}
          <form onSubmit={handleCaptchaSubmit}>
            <div className="text-start">
              <label htmlFor="email" className="text-zinc-700 text-sm ">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border border-zinc-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500 mb-3 text-sm"
                placeholder="Enter your email"
                autoFocus
                autoComplete="true"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />

              <label htmlFor="password" className="text-zinc-700 text-sm ">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-2 border border-zinc-200 rounded-md focus:border-indigo-500 focus:ring-indigo-500 mb-3 text-sm"
                placeholder="Enter your password"
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
              />

              <div className="flex flex-row gap-1 justify-between">
                <canvas
                  ref={canvasRef}
                  width="250"
                  height="50"
                  className="border border-slate-300 rounded-md"
                ></canvas>
                <button
                  id="reload-button"
                  className="bg-emerald-600 rounded-md px-4 text-white hover:bg-emerald-700"
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
                className="w-full border border-slate-300 rounded-md p-2 mt-2 text-sm"
                value={userInput}
                onChange={handleUserInputChange}
              />

              <div className="flex flex-row items-end gap-3 justify-end">
                {/* <Link
                  to={"#"}
                  className="text-sm text-gray-500 hover:text-sky-600 italic underline"
                >
                  Lupa password !
                </Link> */}
                <button
                  type="submit"
                  className={`bg-emerald-700 text-emerald-100 text-sm py-2 px-5 mt-2 hover:bg-emerald-600 rounded-md ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 4.418 3.582 8 8 8v-4c-2.487 0-4.735-.897-6.465-2.376l2.52-2.833z"
                        />
                      </svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
