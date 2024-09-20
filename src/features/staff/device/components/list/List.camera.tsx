import clsx from "clsx";

export interface IListCameraProps {
  selected?: boolean;
  device_id?: string;
  name?: string;
  photo?: string;
  onSelect?: () => void;
}

export const ListCamera = ({
  selected = false,
  name = "",
  photo = "",
  device_id = "",
  onSelect = () => {},
}: IListCameraProps) => {
  const handleClick = () => {
    onSelect();
  };
  return (
    <button
      className={clsx(
        "rounded-[0.5rem] px-[1.5rem] py-[1rem]",
        "bg-raisin-black",
        "grid grid-flow-col w-full justify-start justify-items-start content-center items-center gap-x-[1rem]"
      )}
      value={device_id}
      onClick={handleClick}
    >
      <img src={photo} className={clsx("w-[100px] h-[100px] rounded-[50%]")} />
      <p
        className={clsx(
          "text-[1.5rem]",
          selected ? "font-bold text-go-green" : "font-normal text-white"
        )}
      >
        {name}
      </p>
    </button>
  );
};
