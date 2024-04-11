import { ethers } from "ethers";
import "../styles/Dicegame.css";
import "../styles/Navbar.css";
import grass from "../images/grass4.png";
import unicorn from "../images/unicorn.png";
import React, { useState, useEffect } from "react";

function App({
    ganache_signer,
    user_wallet,
    sepolia_wallet,
    dice_game_contract,
    dice_token_contract,
}) {
    const placeBet = async () => {
        var getAllowance;
        var getBalance;
        getBalance = await dice_token_contract.balanceOf(user_wallet.address);

        const setAllowance = await dice_token_contract.approve(
            dice_game_contract.target,
            "1000000000000000"
        );
        await setAllowance.wait();
        getAllowance = await dice_token_contract.allowance(
            user_wallet.address,
            dice_game_contract.target
        );

        const placeBet = await dice_game_contract.placeBet(10, 2);
    };
    //consider changing UI to something more cosmos like, a black space with stars and rainbows. probably
    //a little bit easier to make this more 90s

    // const [position, setPosition] = useState({ x: 0, y: 0, a: "-", b: "-" });
    // const [angle, setAngle] = useState(0);

    // useEffect(() => {
    //     const moveImage = () => {
    //         const newX = Math.random() * window.innerWidth;
    //         console.log(newX);
    //         const newY = Math.random() * window.innerHeight;
    //         console.log(newY);
    //         const newA = Math.random() > 0.5 ? "+" : "-";
    //         const newB = Math.random() > 0.5 ? "+" : "-";
    //         console.log(newA);
    //         console.log(newB);
    //         setPosition({ x: newX, y: newY, a: newA, b: newB });
    //         setTimeout(moveImage, 100); // Move every second
    //     };

    //     moveImage();

    //     return () => clearTimeout(moveImage);
    // }, []);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setAngle((prevAngle) => (prevAngle + 1) % 360);
    //         console.log("testing");
    //     }, 10); // Change the angle every 10ms

    //     return () => clearInterval(interval);
    // }, []);

    const [activate1, setActivate1] = useState(false);
    const [activate_1, setActivate_1] = useState(false);
    const [activate2, setActivate2] = useState(false);
    const [activate3, setActivate3] = useState(false);
    const [activate4, setActivate4] = useState(false);
    const [activate5, setActivate5] = useState(false);
    const [unicorns, setUnicorns] = useState();

    // grass animation
    useEffect(() => {
        const elements = document.querySelectorAll("#unicorn");
        setUnicorns(elements);
        const interval = setInterval(() => {
            const shouldActivate1 = Math.random() < 0.5;
            const shouldActivate_1 = Math.random() < 0.5;
            const shouldActivate2 = Math.random() < 0.5;
            const shouldActivate3 = Math.random() < 0.5;
            const shouldActivate4 = Math.random() < 0.5;
            const shouldActivate5 = Math.random() < 0.5;
            setActivate1(shouldActivate1);
            setActivate_1(shouldActivate_1);
            setActivate2(shouldActivate2);
            setActivate3(shouldActivate3);
            setActivate4(shouldActivate4);
            setActivate5(shouldActivate5);
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const [enlarged, setEnlarged] = useState(false);
    const [moved, setMoved] = useState(false);

    // const elements = document.querySelectorAll("#unicorn");
    // console.log(elements);

    const random = () => {
        const numbers = [0, 1, 2, 3, 4, 5]; // Array of numbers 0-5
        let shuffled = [...numbers]; // Create a copy of the array to shuffle

        // Shuffle the array
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Generate a random number of elements, up to 6
        const count = Math.floor(Math.random() * 7);
        const randomNumbers = shuffled.slice(0, count); // Select a subset of the shuffled array
        return randomNumbers;
    };

    const handleButtonClick = () => {
        //unicorn1.moved/unicorn2.moved etc will be assigned to the random selection of unicorns
        // setEnlarged(true);
        // setMoved(true);
        // const numberArray = generateRandomNumbers();
        // const newUnicornArray = [];
        // for (let i = 0; i < numberArray.length; i++) {
        //     newUnicornArray.push(unicorns[numberArray[i]]);
        // }
        // // console.log(newUnicornArray);
        // const strArray = [];
        // for (let i = 0; i < newUnicornArray.length; i++) {
        //     var plusOne = i + 1;
        //     var replacement =
        //         "unicorn" + plusOne.toString() + " moved" + " enlarged";
        //     // console.log(replacement);
        //     // strArray.push("unicorn" + plusOne.toString() + ".moved");
        //     // console.log(newUnicornArray[i]);
        //     //maybe just assign new class name?
        //     // newUnicornArray[i].classList.replace(
        //     //     newUnicornArray[i].className,
        //     //     strArray[i]
        //     // );
        //     // console.log(newUnicornArray[i].classList);
        //     // console.log(strArray[i]);
        //     newUnicornArray[i].className = replacement;
        // }

        // var replacement1 = "unicorn" + "1" + " moved" + " enlarged";
        // unicorn1.className = replacement1;

        const randomNumArray = random().sort((a, b) => a - b);
        const newUnicornArray = [];
        // console.log(unicorns);

        for (let i = 0; i < randomNumArray.length; i++) {
            newUnicornArray.push(unicorns[randomNumArray[i]]);
        }
        console.log(newUnicornArray);

        for (let i = 0; i < newUnicornArray.length; i++) {
            var plusOne = i + 1;
            newUnicornArray[i].className =
                "unicorn" + plusOne.toString() + " moved" + " enlarged";
        }
        console.log(randomNumArray);
    };

    return (
        <div className="dicegame-main">
            <button onClick={handleButtonClick} className="test-button">
                Bet
            </button>
            <img
                src={grass}
                className="grass1"
                style={{ animation: activate1 ? "shake 1s" : "none" }}
            ></img>
            <img
                src={grass}
                className="grass_1"
                style={{ animation: activate_1 ? "shake 1s" : "none" }}
            ></img>
            <img
                src={grass}
                className="grass2"
                style={{ animation: activate2 ? "shake 1s" : "none" }}
            ></img>
            <img
                src={grass}
                className="grass3"
                style={{ animation: activate3 ? "shake 1s" : "none" }}
            ></img>
            <img
                src={grass}
                className="grass4"
                style={{ animation: activate4 ? "shake 1s" : "none" }}
            ></img>
            <img
                src={grass}
                className="grass5"
                style={{ animation: activate5 ? "shake 1s" : "none" }}
            ></img>
            <img
                src={grass}
                className="grass6"
                style={{ animation: activate5 ? "shake 1s" : "none" }}
            ></img>
            {/* <div className="circle">
                <img
                    src={unicorn}
                    className="unicorn1"
                    style={{
                        transform: `rotate(${angle}deg) translateX(100px) rotate(-${angle}deg)`,
                    }}
                ></img>
            </div> */}

            <img
                src={unicorn}
                id="unicorn"
                className={`unicorn1 ${enlarged ? "enlarged" : ""} ${
                    moved ? "moved" : ""
                }`}
            ></img>
            <img
                src={unicorn}
                id="unicorn"
                className={`unicorn2 ${enlarged ? "enlarged" : ""} ${
                    moved ? "moved" : ""
                }`}
            ></img>
            <img
                src={unicorn}
                id="unicorn"
                className={`unicorn3 ${enlarged ? "enlarged" : ""} ${
                    moved ? "moved" : ""
                }`}
            ></img>
            <img
                src={unicorn}
                id="unicorn"
                className={`unicorn4 ${enlarged ? "enlarged" : ""} ${
                    moved ? "moved" : ""
                }`}
            ></img>
            <img
                src={unicorn}
                id="unicorn"
                className={`unicorn5 ${enlarged ? "enlarged" : ""} ${
                    moved ? "moved" : ""
                }`}
            ></img>
            <img
                src={unicorn}
                id="unicorn"
                className={`unicorn6 ${enlarged ? "enlarged" : ""} ${
                    moved ? "moved" : ""
                }`}
            ></img>
        </div>
    );
}

export default App;
