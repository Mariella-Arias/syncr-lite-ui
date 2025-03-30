import { MONTHS_ABBREVIATED } from '../../calendar/constants';

const ActivityItem = ({
  name,
  count,
  date,
  completed,
}: {
  name: string;
  count: number;
  date: Date;
  completed?: boolean;
}) => {
  return (
    <div className="border border-input-border rounded-[10px] p-4 flex items-center gap-4 mb-2">
      {completed !== undefined && (
        <div
          className={`size-4 rounded-full ${
            completed ? 'bg-green-500' : 'bg-red-200'
          }`}
        ></div>
      )}
      <div className="">
        <p className="font-nunito text-lg font-bold">{name}</p>
        <p className="font-nunito text-body-text text-sm">
          {count} exercises - {MONTHS_ABBREVIATED[date.getMonth()]}{' '}
          {date.getDate()}, {date.getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;
