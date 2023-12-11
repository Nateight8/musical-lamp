import { AddProduct } from "@/components/AddProduct";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
interface Props {
  params: {
    productId: string;
  };
}

async function Page({ params }: Props) {
  const { productId } = params;

  console.log(productId);

  return (
    <div>
      <div className="flex space-x-4 items-center">
        <div className="">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="">
          <p className="text-muted-foreground text-xs">Back to product list</p>
          <h4 className="text-base font-medium">Add New Product</h4>
        </div>
      </div>
      <AddProduct />
    </div>
  );
}

export default Page;
