import { useEffect, useState } from 'react';
import { TEMP_DATA } from '../data/4m3wData';

type BurnoutRankType = {
    name: string;
    totalTime: number;
};

interface MemberWork {
    name: string;
    date: string;
    start?: number;
    end?: number;
}

interface ifindMostOverloadMemberWork {
    allWorkData: MemberWork[];
    names: string[];
    dates: string[];
}

const calculateDailyWorkload = (start: number, end: number) => {
    if (!start) start = 10;
    if (!end) end = 19;
    if (start < 10) {
        return end > 19 ? 19 - start + (end - 19) * 2 + (10 - start) : end - start + (10 - start);
    }
    return end > 19 ? 19 - start + (end - 19) * 2 : end - start;
};
const findMostOverloadMemeber = (props: ifindMostOverloadMemberWork) => {
    const { allWorkData, names, dates } = props;

    // 이름과 날짜의 조합으로 배열 구성 -> 없는 날짜 데이터는 default값으로 채워줌
    // : [[zini일한data],[evie일한data],[jayden일한data],[amy일한data]]
    const sortDataByNames = names.map((name) => {
        return dates.map((date) => {
            const workByDate = allWorkData.find((workData) => workData.date === date && workData.name === name);
            return workByDate
                ? workByDate
                : {
                    name,
                    date,
                    start: 10,
                    end: 19,
                };
        });
    });

    const burnoutMembers = sortDataByNames.map((work) => {
        return {
            name: work[0].name,
            totalTime: work.reduce((workTime: any, item: any) => {
                // 시작/끝 시간으로 가중치 포함하여 번아웃 시간 계산
                return workTime + calculateDailyWorkload(item.start, item.end);
            }, 0),
        };
    });

    return burnoutMembers.sort((a, b) => {
        return b.totalTime - a.totalTime;
    });
};

export default function Page4w3m() {
    const allWorkData: MemberWork[] = TEMP_DATA;
    // 모든 멤버 이름(중복없이)
    const names = allWorkData
        .map((value) => value.name)
        .reduce(
            (namesWithDuplicates: string[], item: string) =>
                namesWithDuplicates.includes(item) ? namesWithDuplicates : [...namesWithDuplicates, item],
            []
        );
    // 모든 날짜(중복없이)
    const dates = allWorkData
        .map((value) => value.date)
        .reduce(
            (datesWithDuplicates: string[], item: string) =>
                datesWithDuplicates.includes(item) ? datesWithDuplicates : [...datesWithDuplicates, item],
            []
        );

    const [burnoutRank, setBurnoutRank] = useState<BurnoutRankType[]>();
    useEffect(() => {
        const workRank = findMostOverloadMemeber({ allWorkData, names, dates });
        if (workRank) {
            setBurnoutRank(workRank);
        }
    }, []);

    return (
        <div className="App">
            <p>가장 부하가 많이 걸리는 직원은 아래와 같습니다</p>
            {burnoutRank &&
                burnoutRank.map((value, idx) => (
                    <li key={idx}>
                        {idx + 1}. {value.name} ({value.totalTime}시간)
                    </li>
                ))}
        </div>
    );
}

