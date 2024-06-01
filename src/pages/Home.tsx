import React from 'react';
import Chart from '../components/organisms/Chart/Chart';

const Home: React.FC = () => {
    const dataUrl = 'https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=EURUSD&Timeframe=1&Start=57674&End=59113&UseMessagePack=false';

    return (
        <div>
            <h1>Forex Chart</h1>
            <Chart dataUrl={dataUrl} />
        </div>
    );
};

export default Home;
