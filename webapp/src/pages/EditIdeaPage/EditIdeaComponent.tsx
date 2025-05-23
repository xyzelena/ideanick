import type { TrpcRouterOutput } from '@ideanick/backend/src/router';
import { zUpdateIdeaTrpcInput } from '@ideanick/backend/src/router/updateIdea/input';

import { useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import pick from 'lodash/pick';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { FormItems } from '../../components/FormItems';
import { Input } from '../../components/Input';
import { Segment } from '../../components/Segment';
import { Textarea } from '../../components/Textarea';

import { getViewIdeaRoute } from '../../lib/routes';
import { trpc } from '../../lib/trpc';

export const EditIdeaComponent = ({
  idea,
}: {
  idea: NonNullable<TrpcRouterOutput['getIdea']['idea']>;
}) => {
  const navigate = useNavigate();

  const [submittingError, setSubmittingError] = useState<string | null>(null);

  const updateIdea = trpc.updateIdea.useMutation();

  const formik = useFormik({
    initialValues: pick(idea, ['name', 'nick', 'description', 'text']),
    validate: withZodSchema(zUpdateIdeaTrpcInput.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        setSubmittingError(null);

        await updateIdea.mutateAsync({ ideaId: idea.id, ...values });

        void navigate(getViewIdeaRoute({ ideaNick: values.nick }));
      } catch (err: any) {
        setSubmittingError(err.message);
      }
    },
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

          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          {submittingError && <Alert color="red">{submittingError}</Alert>}

          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
