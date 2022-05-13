
type testDataType = {
    name: string,
    card: string
}

type numberInEnglishsType = {
    [key: string]: string
}

const TEST_DATA: testDataType[] = [
    {
        name: "Amy",
        card: "nineone92",
    },
    {
        name: "Evie",
        card: "1seven8one",
    },
    {
        name: "Jayden",
        card: "8twoeight0",
    },
    {
        name: "Ria",
        card: "sevensixonezero"
    },
    {
        name: "Jay",
        card: "zero325five"
    }, {
        name: "Kevin",
        card: "threefouronetwo",
    }
];

const MATCH_ENGLISH_WITH_NUMBERS: numberInEnglishsType[] = [
    { 'zero': '0' },
    { 'one': '1' },
    { 'two': '2' },
    { 'three': '3' },
    { 'four': '4' },
    { 'five': '5' },
    { 'six': '6' },
    { 'seven': '7' },
    { 'eight': '8' },
    { 'nine': '9' }
];

// card 단어를 NUMBER_IN_ENGLISHS 요소들과 비교하여 하나씩 치환
function transEnglishToNumber(card: string, matchEngilshWithNumber: numberInEnglishsType) {
    const key = Object.keys(matchEngilshWithNumber)[0]
    const value: any = matchEngilshWithNumber[key]
    const startIndex = card.indexOf(key)
    if (startIndex !== -1) {
        const endIndex = startIndex + key.length;
        return card.substring(0, startIndex) + value + card.substring(endIndex, card.length)
    } else {
        return card;
    }
}

export default function Page5m2w() {
    // 영어 숫자를 아라비아 숫자로 치환
    const englishToNumberCards = TEST_DATA.map((data) => {
        let cardToNumber = data.card;
        MATCH_ENGLISH_WITH_NUMBERS.forEach((matchEngilshWithNumber) => {
            cardToNumber = transEnglishToNumber(cardToNumber, matchEngilshWithNumber);
            // cardInNumber = cardInNumber.replace(new RegExp(Object.keys(item)[0], "gi"), Object.values(item)[0])
        })
        return {
            name: data.name,
            card: +cardToNumber
        }
    })
    const sortByWinner = englishToNumberCards.sort((a, b) => b.card - a.card)

    console.log(sortByWinner)

    return (
        <div style={{ margin: 100 }}>
            <h3>테스트 데이터:</h3>
            {TEST_DATA.map((data, idx) => <p key={idx}>{data.name} : "{data.card}"</p>)}
            <h3 style={{ marginTop: 30 }}>결과</h3>
            <p>
                {sortByWinner.map((member, idx) => <span style={{ marginRight: 30 }} key={idx}>{idx + 1}. {member.name}</span>)}
            </p>
        </div >
    );
}

