import React, { useEffect, useState } from 'react';

const App = () => {
    const [data, setData] = useState([]);
    const [size, setSize] = useState(2);
    const [flipped, setFlipped] = useState([]);

    const clearBoard = () => {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.remove('flipped');
            card.classList.remove('active');
        });
    }

    useEffect(() => {
        let subdata = [];
        for (let i = 0; i < (size * size) / 2; i++) {
            subdata.push(i);
            subdata.push(i);
        }
        subdata.sort(() => Math.random() - 0.5);
        setData(subdata);
        console.log('Updated Data: ', subdata); // Log subdata instead
        clearBoard();

    }, [size]); // Correct dependency array

    function flipCard(e) {
        if (e.currentTarget.classList.contains('active')) return;
    
        if (flipped.length < 2) {
            if (flipped.length === 1 && flipped[0].id === e.currentTarget.id) {
                flipped[0].classList.add('active');
                e.currentTarget.classList.add('flipped');
                e.currentTarget.classList.add('active');
                setFlipped([]);
    
                // Delay the win alert to allow the flip animation to complete
                setTimeout(() => {
                    if (document.querySelectorAll('.active').length === size * size) {
                        alert('You won!');
                    }
                }, 500); // Adjust timing based on your animation speed
            } else {
                if (flipped.includes(e.currentTarget)) return;
    
                e.currentTarget.classList.toggle('flipped');
                setFlipped([...flipped, e.currentTarget]);
            }
        } else {
            flipped.forEach((card) => {
                card.classList.remove('flipped');
            });
            setFlipped([]);
        }
    }
    


    return (
        <div className='bg-slate-900 h-screen flex flex-col items-center justify-center text-white select-none'>
            <h1 className='text-3xl font-bold mb-4'>Memory Game</h1>

            <div
                className="w-120 h-120 bg-slate-800 rounded-md grid gap-2 p-2"
                style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, gridTemplateRows: `repeat(${size}, 1fr)` }}
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        id={item}
                        className='card text-center cursor-pointer'
                        onClick={(e) => flipCard(e)}
                    >
                        <div className="card-inner h-full flex justify-center items-center">

                            <div className="card-front rounded-md">
                            </div>
                            <div className="card-back rounded-md flex justify-center items-center transition-all duration-500">
                                <h1 className='w-full h-full text-center content-center font-bold text-black' id='value' >
                                    {item}
                                </h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mt-4 flex gap-4'>
                <div className='flex justify-center items-center gap-2'>
                    <label htmlFor="size">Size: {size}</label>
                    <input type="range" name="size" onChange={e => setSize(e.target.value)} min="2" max="10" step="2" />

                </div>
                <button className='bg-slate-700 px-4 py-2 rounded-md cursor-pointer hover:bg-slate-600 ' onClick={() => setSize(2)}>
                    RESET
                </button>
            </div>
        </div>
    )
}

export default App;
