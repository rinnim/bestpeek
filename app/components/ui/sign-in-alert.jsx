"use client";

import { useSignInAlert } from "@/context/SigninAlertContext";
import Button from "./button";
import LinkButton from "./link-button";
import Modal from "./modal";

export default function SignInAlert() {
  const { isVisible, hideAlert } = useSignInAlert();

  if (!isVisible) return null;

  return (
    <Modal title="Oops!" isOpen={isVisible}>
      <div className="flex flex-col gap-5">
        <p className="text-center text-sm">Sign in to use the features</p>
        <div className="flex gap-5 justify-between">
          <Button variant="outline" onClick={hideAlert}>
            Cancel
          </Button>
          <LinkButton onClick={hideAlert} href={"/user/sign-in"}>
            Sign In
          </LinkButton>
        </div>
      </div>
    </Modal>
  );
}
