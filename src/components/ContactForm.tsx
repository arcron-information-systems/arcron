import React, { useState } from "react";
import Button from "./Button";
import Text from "./Text";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e: any) => {
    e.preventDefault();
    resetErrors();
    setIsLoading(true);

    const body = new FormData(e.target);

    try {
      const response = await fetch("https://formspree.io/f/xleylwyv", {
        method: "POST",
        body,
      });
    } catch (error) {
      console.error(error);
    }

    setResponse("Thank you for reaching out! We'll be in touch very soon.");
    setIsLoading(false);
  };

  const resetErrors = () => setResponse("");

  return (
    <section className="w-full">
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={submitForm}
      >
        <input type="hidden" name="form-name" value="contact" />

        <section className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex w-full flex-col gap-4 text-[var(--darkwhite)] sm:flex-1 justify-between">
            <div className="w-full">
              <input
                name={"name"}
                required
                className={[
                  "w-full",
                  name ? "outline-none !border-[var(--darkwhite)]" : "",
                ].join(" ")}
                placeholder={"Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <input
                name={"email"}
                type={"email"}
                required
                className={[
                  "w-full",
                  email ? "outline-none !border-[var(--darkwhite)]" : "",
                ].join(" ")}
                placeholder={"Email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full">
              <input
                name={"phone"}
                type={"tel"}
                required
                className={[
                  "w-full",
                  phone ? "outline-none !border-[var(--darkwhite)]" : "",
                ].join(" ")}
                placeholder={"Phone"}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full text-[var(--darkwhite)] sm:flex-1">
            <textarea
              name={"description"}
              required
              className={[
                "w-full",
                description ? "outline-none !border-[var(--darkwhite)]" : "",
              ].join(" ")}
              placeholder={"Tell us about your project"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </section>
        <section className="flex w-full justify-center">
          <Button text={"SUBMIT"} type={"submit"} isLoading={isLoading} />
        </section>

        {response && <Text className="mt-4 text-center">{response}</Text>}
      </form>
    </section>
  );
};

export default ContactForm;
