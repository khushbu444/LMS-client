import MediaProgressbar from "@/components/media-progress-bar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import VideoPlayer from "@/components/video-player";
import { courseCurriculumInitialFormData } from "@/config";
import { InstructorContext } from "@/context/auth-context/instructor-context";
import { mediaUploadService } from "@/services";
import { useContext, useState } from "react";

function CourseCurriculum() {
  console.log(InstructorContext)
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercentage, 
    setMediaUploadProgressPercentage
  } = useContext(InstructorContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaUploadProgress, setMediaUploadProgress] = useState([]);

  async function handleSingleLectureUpload(event, index) {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const videoFormatData = new FormData();
      videoFormatData.append("file", file);

      try {
        setMediaUploadProgress((prev) => ({ ...prev, [index]: true }));
        const response = await mediaUploadService(videoFormatData, setMediaUploadProgressPercentage);
        console.log(response);

        if (response.success) {
          const updatedData = [...courseCurriculumFormData];
          updatedData[index] = {
            ...updatedData[index],
            videoUrl: response.data.url,
            public_id: response.data.public_id,
          };
          setCourseCurriculumFormData(updatedData);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setMediaUploadProgress((prev) => ({ ...prev, [index]: false }));
      }
    }
  }

  function handleNewLecture() {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleNewLecture}>Add Lectures</Button>
        {
          mediaUploadProgress ? (
          <MediaProgressbar
           isMediaUploading={mediaUploadProgress}
           progress={mediaUploadProgressPercentage}
          />) : null
        }
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((curriculumItem, index) => (
            <div key={index} className="border p-5 rounded-md">
              <div className="flex gap-5 items-center">
                <h3 className="font-semibold">Lecture {index + 1}</h3>
             <div className="mt-6">
             {
                  courseCurriculumFormData[index]?.videoUrl ?
                  <div className="flex gap-3">
                  <VideoPlayer:url={courseCurriculumFormData[index]?.videoUrl}/>
                  <Button>Replace Video</Button>
                  <Button className="bg-red-900" >Delete Lecture</Button>
                  </div> :
                    <Input
                    name={`title-${index + 1}`}
                    placeholder="Enter lecture title"
                    className="max-w-96"
                    value={curriculumItem.title || ""}
                    onChange={(e) => {
                      const updatedData = [...courseCurriculumFormData];
                      updatedData[index].title = e.target.value;
                      setCourseCurriculumFormData(updatedData);
                    }}
                  />
               }
             </div>
               
              
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  checked={Boolean(curriculumItem.freePreview)}
                  onCheckedChange={(checked) => {
                    const updatedData = [...courseCurriculumFormData];
                    updatedData[index].freePreview = checked;
                    setCourseCurriculumFormData(updatedData);
                  }}
                  id={`freePreview-${index + 1}`}
                />
                <Label htmlFor={`freePreview-${index + 1}`}>Free Preview</Label>
              </div>
              <div className="mt-6">
                <Input
                  type="file"
                  accept="video/*"
                  className="mb-4"
                  onChange={(e) => handleSingleLectureUpload(e, index)}
                />
                {mediaUploadProgress[index] && <p>Uploading...</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCurriculum;
