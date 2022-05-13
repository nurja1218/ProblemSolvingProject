
const TEST_DATA = [
    "willoggggg",
    "world",
    "happyyy",
    "lucky",
    "lucky"
];

function countDuplication(text: string) {
    const textArray = text.split('') // 단어를 한글자의 배열로
    let duplicatesNum = 0 // 연속중복 횟수
    let wordWithDuplicatesNum = '' // 중복카운트된 단어

    // 1. 중복o
    //      1-1 중복된 글자 "0" o -> +"0"
    //      1-2 중복된 글자 "0" x
    //          1-2-1 마지막 x -> ++연속반복횟수
    //          1-2-2 마지막 o -> +"연속반복횟수"
    // 2. 중복x
    //      2-1 연속반복 o -> +"연속반복횟수+글자"
    //      2-2 연속반복 x -> +"글자"
    //      연속반복횟수 초기화
    textArray.forEach((char, idx) => {
        if (textArray[idx - 1] === char) {
            if (char === '0') {
                wordWithDuplicatesNum = wordWithDuplicatesNum + char
            } else {
                duplicatesNum = duplicatesNum ? ++duplicatesNum : 2;
                if (idx === textArray.length - 1) wordWithDuplicatesNum = wordWithDuplicatesNum + duplicatesNum.toString();
            }
        } else {
            wordWithDuplicatesNum = duplicatesNum ? wordWithDuplicatesNum + duplicatesNum.toString() + char : wordWithDuplicatesNum + char;
            duplicatesNum = 0
        }
    })

    return wordWithDuplicatesNum;
}

function applyAmyRule(input: Array<string>) {
    // 데이터 중 최고 길이의 단어를 찾는다
    const maxLengthWord = input.reduce((prevWord, currWord) => prevWord.length > currWord.length ? prevWord : currWord)
    // 최대단어길이 = 결과배열 개수 / 샘플데이터 개수 = 단어길이
    const switchRowToColumn = maxLengthWord.split('').map((_, idx) => {
        let columnWord = ""
        input.forEach((word) => { // 테스트데이터 개수 = 세로 문자 길이
            columnWord += (word[idx] || '0');
        })
        return columnWord;
    })

    // 연속중복 카운트된 문자 배열
    const ListWithappliedAmyRule = switchRowToColumn.map(countDuplication)
    return { switchRowToColumn, ListWithappliedAmyRule };
}

export default function Page4w4m() {

    // 첫번째: 그냥 세로로 읽은 단어 배열
    // 두밴째: 중복 카운트 반영한 최종 배열
    const { switchRowToColumn, ListWithappliedAmyRule } = applyAmyRule(TEST_DATA)

    return (
        <div style={{ margin: 100 }}>
            <p style={{ marginBottom: 30 }}>테스트 데이터: {JSON.stringify(TEST_DATA)}</p>

            <p>1. {JSON.stringify(switchRowToColumn)}</p>
            <p>2. {JSON.stringify(ListWithappliedAmyRule)}</p>
            <p>3. {ListWithappliedAmyRule.join(' / ')}</p>
        </div>
    );
}

