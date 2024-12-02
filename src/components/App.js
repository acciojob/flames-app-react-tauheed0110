import React, { useState } from "react";
import '../styles/App.css';

const App = ()=>{
    const[answer, setAnswer] = useState("");
    const[fname, setFname] = useState("");
    const[sname, setSname] = useState("");

    function handleClear(e) {
        e.preventDefault();
        setAnswer("");
        setFname("");
        setSname("");
    }
    function calculateRelation(e) {
        e.preventDefault();
        // use frequency method to this.
        const map1 = new Map();
        const map2 = new Map();
        for (let i = 0; i < fname.length; i++) {
            const char = fname.charAt(i)
            if (map1.has(char)) {
                map1.set(char, map1.get(char) + 1);
            } else {
                map1.set(char, 1);
            }
        }
        // iterate teh second string
        for (let i = 0; i < sname.length; i++) {
            const char = sname.charAt(i)
            if (map2.has(char)) {
                map2.set(char, map2.get(char) + 1);
            } else {
                map2.set(char, 1);
            }
        }
        // now add all the values;
        let sum = 0;
        for (const key of map1.keys()) {
            if(map2.has(key)){
                map1.set(key, Math.abs(map1.get(key) - map2.get(key)));
                map2.delete(key);
            }{
                map1.set(key, map1.get(key));
            }
        }
        for(const key of map2.keys()){
            sum += map2.get(key);
        }
        for(const key of map1.keys()){
            sum += map1.get(key);
        }

        const relation = findRelation(sum % 6);
        setAnswer(relation);
    }
    function findRelation(value) {
        switch (value) {
            case 0:
                return "Siblings"
            case 1:
                return "Friends"
            case 2:
                return "Love"
            case 3:
                return "Affection"
            case 4:
                return "Marriage"
            case 5:
                return "Enemy"
        }
    }
    return (
        <div id="main">
            <h1>Calculate Relationship</h1>
            <form>
                <input data-testid="input1" name="name1" type="text" placeholder="Enter first name" value={fname} onChange={(e) => setFname(e.target.value)} />
                <input data-testid="input2" name="name2" type="text" placeholder="Enter second name" value={sname} onChange={(e) => setSname(e.target.value)} />
                <button data-testid="calculate_relationship" name="calculate_relationship" onClick={(e)=>calculateRelation(e)}>Calculate Relationship Future</button>
                <button data-testid="clear" name="clear" onClick={(e)=>handleClear(e)}>Clear</button>
            </form>
            <h3 data-testid="answer">{answer}</h3>
        </div>
    )
}


export default App;
