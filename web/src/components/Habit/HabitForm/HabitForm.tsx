import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { Button } from 'antd-mobile'

const HabitForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.habit?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.habit?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="minimumCompletionRequirement"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Minimum completion (such as read 2 pages)
        </Label>

        <TextField
          name="minimumCompletionRequirement"
          defaultValue={props.habit?.minimumCompletionRequirement}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError
          name="minimumCompletionRequirement"
          className="rw-field-error"
        />

        {/* <Label
          name="achieveCount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Achieve count
        </Label>

        <NumberField
          name="achieveCount"
          defaultValue={props.habit?.achieveCount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        /> */}

        {/* <FieldError name="achieveCount" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <TextField
          name="userId"
          defaultValue={props.habit?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" /> */}

        <div className="rw-button-group">
          {/* <Submit  className="rw-button rw-button-main">
            Save
          </Submit> */}

          <Button
            type="submit"
            size="small"
            disabled={props.loading}
            color="primary"
            shape="rounded"
          >
            save
          </Button>
          <div style={{ width: '10px' }}></div>
          <Button
            shape="rounded"
            size="small"
            onClick={() => navigate(routes.list())}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default HabitForm
