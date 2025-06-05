import type { TrpcRouterOutput } from '@ideanick/backend/src/router';
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input';

import pick from 'lodash/pick';
import { useNavigate } from 'react-router-dom';

import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';

import { useForm } from '../../lib/form';
import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const EditIdeaComponent = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const navigate = useNavigate();

  const updateIdea = trpc.updateIdea.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateIdeaTrpcInput.omit({ ideaId: true }),

    onSubmit: async (values) => {
      await updateIdea.mutateAsync({ ideaId: idea.id, ...values });
      void navigate(getViewIdeaRoute({ ideaNick: values.nick }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit Idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />

          <Input label="Nick" name="nick" formik={formik} />

          <Input
            label="Description"
            name="description"
            maxWidth={500}
            formik={formik}
          />

          <Textarea label="Text" name="text" formik={formik} />

          <Alert {...alertProps} />

          <Button {...buttonProps}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
