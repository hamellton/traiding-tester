export interface AppConfig {
    endpoints: {
      eurUsd: string;
      usdJpy: string;
    }
  }
  
  const config: AppConfig = {
    endpoints: {
      eurUsd: 'https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=EURUSD&Timeframe=1&Start=57674&End=59113&UseMessagePack=false',
      usdJpy: 'https://beta.forextester.com/data/api/Metadata/bars/chunked?Broker=Advanced&Symbol=USDJPY&Timeframe=1&Start=57674&End=59113&UseMessagePack=false',
    }
  };
  
  export default config;
  