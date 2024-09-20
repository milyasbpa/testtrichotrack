import clsx from "clsx";

export interface IProductsCardCustomerHomeCareProps {
  title?: string;
  products?: {
    image: string;
    name: string;
    description: string;
  }[];
}

export const ProductsCardCustomerHomeCare = ({
  title = "Products",
  products = [],
}: IProductsCardCustomerHomeCareProps) => {
  return (
    <div
      className={clsx(
        "bg-charleston-green",
        "rounded-[0.5rem]",
        "p-[1rem]",
        "grid grid-cols-1 place-content-start place-items-start gap-y-[1.5rem]",
        "w-full h-full"
      )}
    >
      <h3 className={clsx("text-[1.25rem] text-white font-bold")}>{title}</h3>
      <div
        className={clsx(
          "grid grid-cols-2 place-content-start place-items-start gap-y-[1.5rem] gap-x-[1.5rem]"
        )}
      >
        {products.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-y-[0.5rem]",
              "rounded-[0.5rem]",
              "bg-eerie-black",
              "p-[1rem]",
              "h-full w-full"
            )}
          >
            <img
              src={item.image}
              className={clsx(
                "object-cover",
                "w-full",
                "aspect-[3/2]",
                "rounded-[0.5rem]"
              )}
            />

            <p
              className={clsx("text-[1rem] text-white-80 font-bold text-left")}
            >
              {item.name}
            </p>
            <p
              className={clsx(
                "text-[0.875rem] text-white-57 font-regular text-left"
              )}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
