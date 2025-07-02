
interface RiskOverviewHeaderProps {
  title: string;
  subtitle: string;
}

export const RiskOverviewHeader = ({ title, subtitle }: RiskOverviewHeaderProps) => {
  return (
    <div className="pb-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h1>
        <p className="text-gray-500 mt-2">{subtitle}</p>
      </div>
    </div>
  );
};
