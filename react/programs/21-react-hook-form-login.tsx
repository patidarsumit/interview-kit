import {useForm} from 'react-hook-form';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginFormExample() {
  const {
    formState: {errors, isSubmitting},
    handleSubmit,
    register,
  } = useForm<LoginForm>();

  async function onSubmit(values: LoginForm) {
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        aria-invalid={Boolean(errors.email)}
        {...register('email', {required: 'Email is required'})}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}

      <input
        type="password"
        aria-invalid={Boolean(errors.password)}
        {...register('password', {required: 'Password is required'})}
      />
      {errors.password && <p role="alert">{errors.password.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        Sign in
      </button>
    </form>
  );
}

