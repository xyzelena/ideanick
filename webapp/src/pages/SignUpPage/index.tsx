import { zSignUpTrpcInput } from '@ideanick/backend/src/router/signUp/input';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Alert } from '../../components/Alert/index.tsx';
import { Button } from '../../components/Button/index.tsx';
import { FormItems } from '../../components/FormItems/index.tsx';
import { Input } from '../../components/Input/index.tsx';
import { Segment } from '../../components/Segment/index.tsx';

import { useForm } from '../../lib/form';
import { getAllIdeasRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc.tsx';

export const SignUpPage = () => {
  const navigate = useNavigate();

  const trpcUtils = trpc.useUtils();

  const signUp = trpc.signUp.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: zSignUpTrpcInput
      .extend({
        passwordAgain: z.string().min(1),
      })
      .superRefine((val, ctx) => {
        if (val.password !== val.passwordAgain) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Passwords must be the same',
            path: ['passwordAgain'],
          });
        }
      }),

    onSubmit: async (values) => {
      const { token } = await signUp.mutateAsync(values);
      Cookies.set('token', token, { expires: 99999 });
      void trpcUtils.invalidate();
      void navigate(getAllIdeasRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign Up">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          <Input
            label="Password again"
            name="passwordAgain"
            type="password"
            formik={formik}
          />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign Up</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
