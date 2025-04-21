import { MessageSquareMore, Smartphone } from "lucide-react";
import { useLoaderData } from "react-router";
import PageTitleContainer from "~/components/common/PageTitleContainer";
import MediumSectionContainer from "~/components/Mobile/MediumSectionContainer";
import OfficialBlogSectionContainer from "~/components/Mobile/OfficialBlogSectionContainer";
import YoutubeSectionContainer from "~/components/Mobile/YoutubeSectionContainer";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { getLynxBlogContents } from "~/services/fetch.lynx";
import { getReactNativeBlogContents } from "~/services/fetch.react-native";

import { mobileService } from "~/services/supabase.mobile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { useState } from "react";

export const loader = async () => {
  // --------------------------
  // Youtube
  // --------------------------
  const youtubeChannels = await mobileService.getYoutubeChannels();
  const youtubeVideos = await mobileService.getYoutubeVideos();

  // ----------------------------
  // Medium
  // ----------------------------
  const mediumBlogContents = await mobileService.getMediumBlogContents();
  const mediumBlogs = await mobileService.getMediumBlogs();

  // ----------------------------
  // Official Blog
  // ----------------------------

  const officialBlogs = await mobileService.getOfficialBlogs();

  const reactNativeBlogContents = await getReactNativeBlogContents();
  const lynxBlogContents = await getLynxBlogContents();
  const N8N_WEBHOOK_URL = process.env.VITE_N8N_WEBHOOK_URL;
  return {
    youtubeChannels,
    youtubeVideos,
    mediumBlogs,
    mediumBlogContents,
    officialBlogs,
    reactNativeBlogContents,
    lynxBlogContents,
    N8N_WEBHOOK_URL,
  };
};

export default function index() {
  const {
    youtubeChannels,
    youtubeVideos,
    mediumBlogs,
    mediumBlogContents,
    officialBlogs,
    reactNativeBlogContents,
    lynxBlogContents,
    N8N_WEBHOOK_URL,
  } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-900 py-12 flex flex-col text-white">
      <div className="container mx-auto px-4 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <PageTitleContainer
            icon={<Smartphone className="w-10 h-10" />}
            title="Mobile"
          />
          <PopoverWithForm hookURL={N8N_WEBHOOK_URL || ""} />
        </div>
        <YoutubeSectionContainer
          youtubeChannels={youtubeChannels}
          youtubeVideos={youtubeVideos}
        />
        <MediumSectionContainer
          mediumBlogs={mediumBlogs}
          mediumBlogContents={mediumBlogContents}
        />
        <OfficialBlogSectionContainer
          officialBlogs={officialBlogs}
          officialBlogResult={[reactNativeBlogContents, lynxBlogContents]}
        />
      </div>
    </div>
  );
}

const FormSchema = z.object({
  phoneNumber: z.string().min(10, {
    message: "Your Phone number must be 10 digits.",
  }),
});

function PopoverWithForm({ hookURL }: { hookURL: string }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch(hookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: data.phoneNumber }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (err) {
      console.error("Request failed:", err);
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-fit bg-white text-gray-700 mr-3 font-bold flex items-center hover:bg-gray-600 hover:text-white hover:cursor-pointer">
          <MessageSquareMore />
          Send SMS
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-100 bg-gray-600 text-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Phone Number</h4>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={10} {...field}>
                          <InputOTPGroup>
                            {Array.from({ length: 10 }, (_, i) => (
                              <InputOTPSlot key={i} index={i} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-white text-gray-700 font-bold hover:bg-gray-800 hover:text-white hover:cursor-pointer"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
