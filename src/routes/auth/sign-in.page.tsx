import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useTokenCodeMutation } from "@/hooks/auth/mutation/useTokenCodeMutation";
import { useValidateEmailMutation } from "@/hooks/auth/mutation/useValidateEmailMutation";

type Inputs = {
  email: string;
  password: string;
};

function SignInPage() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [validateEmailMutation] = useValidateEmailMutation();
  const [tokenCodeMutation] = useTokenCodeMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const email = data.email;
    validateEmailMutation({
      variables: { input: { email } },
      onCompleted: ({ validateEmail: { valid } }) => {
        console.log(valid);
        tokenCodeMutation({ variables: { input: { email } } });
        navigate(`/auth/verify?email=${encodeURIComponent(email)}`);
      },
    });
  };

  return (
    <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="me@example.com" required {...register("email")} />

              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required {...register("password")} />
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <video
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width="1920"
          height="1080"
          autoPlay
          loop
          muted
        >
          <source src="https://app.bettermode.com/images/animated-bg-encoded-720.mp4" />
        </video>
      </div>
    </div>
  );
}

export default SignInPage;
