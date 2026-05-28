interface ProductFormProps {
  initialData?: {
    name?: string;
    description?: string;
    price?: number;
    inventory?: number;
    category?: string;
    image?: string;
    featured?: boolean;
  };
}

export default function ProductForm({ initialData }: ProductFormProps) {
  return (
      <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={initialData?.name ?? ''}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          placeholder="Hermes Agents Deployed"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={initialData?.description ?? ''}
          className="resize-none rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          placeholder="Service description..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Price ($)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={initialData?.price ?? ''}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            placeholder="499.00"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="inventory" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Inventory
          </label>
          <input
            id="inventory"
            name="inventory"
            type="number"
            min="0"
            required
            defaultValue={initialData?.inventory ?? ''}
            className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            placeholder="10"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="category" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Category
        </label>
        <input
          id="category"
          name="category"
          required
          defaultValue={initialData?.category ?? ''}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          placeholder="Agent Services"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="image" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Image URL
        </label>
        <input
          id="image"
          name="image"
          type="url"
          required
          defaultValue={initialData?.image ?? ''}
          className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-sm text-black dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      <label className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={initialData?.featured ?? false}
          className="h-4 w-4 rounded border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-900 text-black dark:text-white focus:ring-zinc-500"
        />
        Featured product
      </label>

      <button
        type="submit"
        className="mt-2 rounded-lg bg-black dark:bg-white px-6 py-3 font-medium text-white dark:text-black transition-opacity hover:opacity-80"
      >
        Save Product
      </button>
    </div>
  );
}
