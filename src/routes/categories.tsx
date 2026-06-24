import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { CategoryCard } from "@/components/CategoryCard";
import { Stagger, StaggerItem } from "@/components/Reveal";
import { categories } from "@/lib/data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Digie" },
      {
        name: "description",
        content:
          "Explore Digie product categories: Smart TVs, speakers, coolers, washing machines, kitchen appliances and more.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Browse"
        title="Categories"
        description="Find your category and discover products engineered for the way you live."
        crumbs={[{ label: "Categories" }]}
      />
      <section className="container-px mx-auto max-w-7xl py-12">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <StaggerItem key={c.id} className="h-full">
              <CategoryCard category={c} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </>
  );
}
