"use client";

import * as React from "react";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createResourceAction } from "./server-actions";

function getResourceTypeOptions() {
  return ["ARTICLE", "VIDEO", "COURSE", "BOOK", "OTHER"] as const;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().min(1, "URL is required"),
  resourceType: z.enum(getResourceTypeOptions()),
  category: z.string().optional().nullable(),
  tags: z.string().optional().nullable(),
  aiSummary: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

type ResourceNewFormProps = {
  initialResourceType?: (typeof getResourceTypeOptions)[number] extends never
    ? "OTHER"
    : (typeof getResourceTypeOptions)[number];
};


export default function ResourceNewForm({
  initialResourceType = "OTHER",
}: ResourceNewFormProps) {
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      resourceType: initialResourceType,
      category: "",
      tags: "",
      aiSummary: "",
      description: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    try {
      const payload = {
        ...values,
        category: values.category?.trim() || null,
        tags: values.tags?.trim() || null,
        aiSummary: values.aiSummary?.trim() || null,
        description: values.description?.trim() || null,
      };

      await createResourceAction(payload);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add Resource</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <FormControl>
                      <Input id="title" placeholder="e.g. Advanced ML Course" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.title?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resourceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="resourceType">Resource Type</FormLabel>
                    <FormControl>
                      <select
                        id="resourceType"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        {getResourceTypeOptions().map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.resourceType?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="url">URL</FormLabel>
                  <FormControl>
                    <Input id="url" placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.url?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormControl>
                      <Input id="category" placeholder="e.g. NLP" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.category?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="tags">Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input id="tags" placeholder="e.g. transformers, transformers" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.tags?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="aiSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="aiSummary">AI Summary</FormLabel>
                    <FormControl>
                      <textarea
                        id="aiSummary"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.aiSummary?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <textarea
                        id="description"
                        className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{form.formState.errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  window.location.href = "/resources";
                }}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : "Save Resource"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

