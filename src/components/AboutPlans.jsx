import { Accordion, Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import style from "../styles/AboutPlans.module.css"
import { useForm } from "react-hook-form";

const AboutPlans = () => {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({});

    const onSubmit = (e) => {
        console.log(e)
    }


    return (
        <>
            <Container fluid className="py-3">
                <h2 className={style.title}>Planes de seguro personalizados para tus mascotas</h2>
                <h3 className={style.subtitle}>Actualmente contamos con los siguientes planes de seguro para tus mascotas. Para que uno de nuestros profecionales se ponga en contacto contigo rellena el formulario más abajo.</h3>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className={style.accordionHeader}>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <h3 className="ms-1 mb-0">Primeros pasos</h3>
                                <p className="mb-0 me-3">Desde $30000</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>
                                "Primeros Pasos" es un plan veterinario diseñado para mascotas de 0 a 5 años, enfocado en garantizar un crecimiento saludable y una vida plena desde los primeros días. Incluye chequeos veterinarios regulares para monitorear su desarrollo y detectar tempranamente posibles problemas de salud. El plan cubre vacunación completa para proteger a tu mascota de enfermedades comunes, además de desparasitaciones periódicas para mantenerla libre de parásitos.
                            </p>
                            <p>
                                También ofrece asesoría nutricional adaptada a las necesidades específicas de esta etapa, ayudando a establecer una dieta equilibrada que favorezca su crecimiento. Además, se brinda orientación sobre los cuidados básicos, educación en hábitos y recomendaciones para el bienestar general de tu mascota, asegurando que su introducción a la vida familiar sea saludable y feliz.
                            </p>
                            <p>
                                Con "Primeros Pasos", tu mascota recibirá la atención que necesita para un desarrollo adecuado, previniendo problemas de salud a largo plazo y fomentando una vida activa y saludable desde su primer año. Es un plan integral para sentar las bases de una vida llena de vitalidad.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header className={style.accordionHeader}>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <h3 className="ms-1 mb-0">Madurando</h3>
                                <p className="mb-0 me-3">Desde $60000</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>
                                "Madurando" es un plan veterinario dirigido a mascotas de 5 a 10 años, una etapa crucial donde comienzan a mostrar signos de envejecimiento. Este plan ofrece chequeos regulares para monitorear su salud general, ayudando a detectar a tiempo cualquier problema relacionado con el envejecimiento, como enfermedades cardíacas, articulares o metabólicas.
                            </p>
                            <p>
                                Incluye control de peso y asesoría nutricional, ajustando su dieta a sus necesidades específicas, ayudando a prevenir problemas como la obesidad o deficiencias alimentarias. Además, cubre cuidados dentales, esenciales para evitar problemas orales que podrían afectar su calidad de vida.
                            </p>
                            <p>
                                "Madurando" también enfoca la prevención de enfermedades crónicas con análisis de laboratorio periódicos y un monitoreo constante de su salud. Este plan asegura que tu mascota se mantenga activa y saludable en su adultez, con una atención integral diseñada para promover su bienestar.
                            </p>
                            <p>
                                Con "Madurando", tu mascota recibirá los cuidados necesarios para disfrutar de esta etapa vital con energía y buena salud, previniendo complicaciones y manteniendo su calidad de vida.
                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header className={style.accordionHeader}>
                            <div className="d-flex align-items-center justify-content-between w-100">
                                <h3 className="ms-1 mb-0">Adultos</h3>
                                <p className="mb-0 me-3">Desde $70000</p>
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>
                                "Adultos" es un plan veterinario creado para mascotas mayores de 10 años, diseñado para garantizar su bienestar y calidad de vida en su etapa senior. Incluye chequeos geriátricos detallados, con un enfoque en la detección temprana de enfermedades comunes en mascotas mayores, como problemas cardíacos, renales y articulares. También se ofrece manejo del dolor para mejorar su confort y movilidad, así como el control y seguimiento de enfermedades crónicas.
                            </p>
                            <p>
                                El plan abarca cuidados dentales, ya que la salud bucal es fundamental para evitar infecciones y complicaciones en la tercera edad. Además, se proporciona asesoría nutricional avanzada, adaptada a las necesidades específicas de cada mascota, enfocándose en el control de peso y en la selección de dietas adecuadas para prevenir problemas como la obesidad o la pérdida de masa muscular.
                            </p>
                            <p>
                                Con "Adultos", tu mascota recibirá un monitoreo constante de su salud, con el objetivo de brindarle una vida longeva y plena, ayudando a prevenir complicaciones relacionadas con la edad y asegurando que se mantenga activa y cómoda durante sus años dorados.
                            </p>


                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                <Container className="my-5" fluid="lg">
                    <h3 className="mb-3">Completa el formulario para que nos pongamos en contacto contigo</h3>
                    <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="d-flex flex-column flex-md-row gap-3 w-100 justify-content-between">
                            <FloatingLabel className="mb-3 w-100" controlId="contactFormName" label="Nombre">
                                <Form.Control type="text" name="nombre" {...register("nombre")} />
                                {errors.nombre && <div className="text-danger pt-1">{errors.nombre.message}</div>}
                            </FloatingLabel>

                            <FloatingLabel className="mb-3 w-100" controlId="contactFormLastName" label="Apellido">
                                <Form.Control type="text" name="apellido" {...register("apellido")} />
                                {errors.apellido && <div className="text-danger pt-1">{errors.apellido.message}</div>}
                            </FloatingLabel>
                        </div>


                        <FloatingLabel className="mb-3" controlId="contactFormEmail" label="Email">
                            <Form.Control type="email" name="email" {...register("email")} />
                            {errors.email && <div className="text-danger pt-1">{errors.email.message}</div>}
                        </FloatingLabel>

                        <Form.Group className="mb-3 w-100 " controlId="contactFormLastName">
                            <Form.Label className="fs-4 mb-3">Plan que te interesa</Form.Label>

                            <div className="d-flex gap-3 flex-column flex-md-row">
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Primeros Pasos"
                                    name="primeros-pasos"
                                    value="primeros-pasos"
                                    id="radioBtnPrimerosPasos"
                                    {...register("plan")}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Madurando"
                                    name="madurando"
                                    value="madurando"
                                    id="radioBtnMadurando"
                                    {...register("plan")}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="Adultos"
                                    name="adultos"
                                    value="adultos"
                                    id="radioBtnAdultos"
                                    {...register("plan")}
                                />
                            </div>
                            {errors.plan && <div className="text-danger pt-2">{errors.plan.message}</div>}
                        </Form.Group>

                        <FloatingLabel controlId="contactFormMessage" label="Enviar mensaje">
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                name="mensaje"
                                {...register("mensaje")}
                            />
                            {errors.mensaje && <div className="text-danger pt-1">{errors.mensaje.message}</div>}
                        </FloatingLabel>

                        <div className="d-flex align-items-center justify-content-between">
                            <Button variant="primary" className="btnPersonalized1" type="submit" disabled={isSubmitting}>{isSubmitting ? "Enviando mensaje..." : "Enviar mensaje"}</Button>
                            <p className="d-none d-md-block">¡Gracias por contactarnos!</p>
                        </div>
                    </Form>
                </Container>
            </Container>
        </>
    );
}

export default AboutPlans;