import MediaProgressbar from "@/components/media-progress-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/auth-context/instructor-context";
import { useContext, useState } from "react";

function CourseSettings() {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadService,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage,
    setMediaUploadProgressPercentage,
  } = useContext(InstructorContext);

  const [currentindex, setCurrentIndex] = useState(0);

  async function handleImageUploadChange(event) {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          imageFormData,
          setMediaUploadProgressPercentage
        );
        console.log(response);

        if (response.success) {
          const updatedData = [...courseCurriculumFormData];
          updatedData[currentindex] = {
            ...updatedData[currentindex],
            videoUrl: response.data.url,
            public_id: response.data.public_id,
          };
          setCourseCurriculumFormData(updatedData);
          setCourseLandingFormData({
            ...courseLandingFormData,
            imageUrl: response.data.url,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setMediaUploadProgress(false);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
        <div className="p-4">
        {mediaUploadProgress ? (
        <MediaProgressbar
          isMediaUploading={mediaUploadProgress}
          progress={mediaUploadProgressPercentage}
        />
      ) : null}
        </div>

      <CardContent>
        <div className="flex flex-col gap-3">
          <Label>Upload Course Image</Label>
          <Input
            onChange={handleImageUploadChange}
            type="file"
            accept="image/*"
            className="mb-4"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseSettings;
