import { TrendData } from "../dummyData/TrendData";

const TrendCard = () => {
    return (
        <div className="TrendCard flex flex-col gap-4 dark:bg-darkCardColor bg-cardColor p-4 rounded-lg mt-4 ">
            <h3>Trends for you</h3>
            {TrendData.map((trend, id) => {
                return (
                    <div key={id} className="trend flex flex-col gap-2">
                        <span className="font-bold cursor-pointer hover:underline">
                            #{trend.name}
                        </span>
                        <span className="text-sm">{trend.shares}k shares</span>
                    </div>
                );
            })}
        </div>
    );
};

export default TrendCard;
