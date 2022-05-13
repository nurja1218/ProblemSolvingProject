import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function MainPage() {
    const history = useHistory()

    const handleClick = (e: any) => {
        history.push(`/${e.target.value}`)
        history.go(0)
    }
    return (
        <div>
            <div style={{ left: 50, margin: 50 }}>SOUL 알고리즘</div>
            <div style={{ left: 50, margin: 50 }}>
                <li><Button onClick={handleClick} value='4m3w'>4월3째주</Button></li>
                <li><Button onClick={handleClick} value='4m4w'>4월4째주</Button></li>
                <li><Button onClick={handleClick} value='5m2w'>5월2째주</Button></li>
            </div>
        </div>
    );
}


const Button = styled.button<{ size?: 'small'; theme?: 'secondary' }>`
    border: 1px solid black;
    background-color: white;
    padding: 0.4rem 1rem;
    border-radius: 4px;
    transition: 0.2s;
    font-size: 1rem;
    cursor: pointer;
    &:hover {
        background-color: whitesmoke;
    }
    &:disabled {
        border: 1px solid grey;
    }
    ${(props) => props.size === 'small' && 'font-size : 0.8rem;padding : 0.2rem 0.5rem;'}
    ${(props) => props.theme === 'secondary' && 'opacity: 0.5'}
`;


