"use client";

import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { IFUser } from "@/app/interfaces/user";
import AvatarUser from "@/components/ui/avatar-user";
import { uploadMedia } from "@/app/api/mediaApi";
import { updateProfile } from "@/app/api/userApi";
import { useUserStore } from "@/app/stores/useUserStore";
import { format } from "date-fns";

type TUserInfoProps = {
  user: IFUser;
  page: string;
}

export default function UserInfo({ user, page }: TUserInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [bio, setBio] = useState(user.bio || "");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setLoading(true);
    let avatarUrl = avatar;

    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      const { data, error } = await uploadMedia(file);

      if (error) {
        setLoading(false);
        return;
      }

      if (data && data.url) {
        avatarUrl = data.url;
      }
    }

    const payload = {
      avatar: avatarUrl || "",
      name: name,
      bio: bio,
    };

    const { data, error } = await updateProfile(user.id, payload);
    if (!error && data) {
      useUserStore.getState().setUser(data.data);
    }
    setLoading(false);
    setIsEditing(false);
  };

  const handleChooseAvt = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploading(true);

      const { data, error } = await uploadMedia(file);
      if (!error && data?.url) {
        setAvatar(data.url);
      }

      setUploading(false);
    }
  };

  return (
    <Card
      className={`relative w-full max-w-2xl ${
        page === "profile" ? "-mt-16" : ""
      } p-6 shadow-lg rounded-xl`}
    >
      <div className="flex flex-col items-center">
        <AvatarUser
          userName={name}
          userAvt={avatar}
          size={100}
          fontSize="text-2xl"
        />
        {isEditing ? (
          <>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              onClick={handleChooseAvt}
              variant="outline"
              type="button"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Set Avatar"}
            </Button>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-4 text-2xl font-semibold border border-gray-300 rounded-md p-2"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Bio"
              className="mt-4 w-full border border-gray-300 rounded-md p-2"
            />
          </>
        ) : (
          <h2 className="mt-4 text-2xl font-semibold">{name}</h2>
        )}

        <p className="text-gray-500">{user.email || "404 email not found"}</p>

        <div className="flex items-center text-gray-400 text-sm mt-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span>
            Joined on {format(new Date(user?.createdAt || new Date()), "MMMM dd, yyyy")}
          </span>
        </div>
        {bio && (
          <p className="mt-2 text-gray-600">{bio}</p>
        )}

        {isEditing ? (
          <Button
            onClick={handleSave}
            className="mt-4 bg-green-600 hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Edit Profile
          </Button>
        )}
      </div>
    </Card>
  );
}
