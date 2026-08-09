import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  parentName: z.string().trim().min(2, 'Please enter your name').max(100),
  parentEmail: z.string().trim().email('Please enter a valid email').max(160),
  parentPhone: z.string().trim().min(7, 'Please enter a valid phone number').max(30),
  studentName: z.string().trim().max(100).optional(),
  intendedClass: z.string().min(1, 'Please choose an intended class'),
  session: z.string().min(1, 'Please choose an academic session'),
  message: z.string().trim().max(1000, 'Message is too long').optional(),
  website: z.string().max(0).optional(),
  consent: z.boolean().refine(Boolean, 'Please confirm that we may use this information to respond to you'),
});

type FormData = z.infer<typeof formSchema>;

const classOptions = [
  'Nursery 1', 'Nursery 2',
  'Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6',
  'JSS 1', 'JSS 2', 'JSS 3',
  'SS 1', 'SS 2', 'SS 3',
];

const Admissions = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      studentName: '',
      intendedClass: '',
      session: '2026/2027',
      message: '',
      website: '',
      consent: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/admissions-submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({ message: 'Unable to submit the enquiry.' }));
      if (!response.ok) throw new Error(result.message || 'Unable to submit the enquiry.');

      setIsSubmitted(true);
      form.reset();
      toast({ title: 'Enquiry sent', description: 'The school will contact you using the details you provided.' });
    } catch (error) {
      toast({
        title: 'Enquiry not sent',
        description: error instanceof Error ? error.message : 'Please call the school directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-24">
        <Card className="max-w-lg mx-auto card-elevated">
          <CardContent className="p-8 text-center space-y-5">
            <CheckCircle className="h-12 w-12 text-success mx-auto" />
            <h1 className="text-3xl font-display font-semibold text-primary">Thank you</h1>
            <p className="text-muted-foreground">Your admissions enquiry has been sent. The school will contact you using the details you provided.</p>
            <Button onClick={() => setIsSubmitted(false)} className="btn-primary">Send another enquiry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-5xl font-display font-semibold mb-5">Admissions Enquiry</h1>
          <p className="text-xl text-blue-100">Tell us how to contact you and the class you are interested in. We deliberately do not ask for sensitive student records on this public form.</p>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto grid gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Request admission information</CardTitle>
                <CardDescription>For certificates, medical information, detailed records or other confidential documents, please wait for the school to contact you.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="parentName" render={({ field }) => (
                        <FormItem><FormLabel>Parent/Guardian name *</FormLabel><FormControl><Input autoComplete="name" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="parentPhone" render={({ field }) => (
                        <FormItem><FormLabel>Phone number *</FormLabel><FormControl><Input type="tel" autoComplete="tel" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="parentEmail" render={({ field }) => (
                      <FormItem><FormLabel>Email address *</FormLabel><FormControl><Input type="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="studentName" render={({ field }) => (
                      <FormItem><FormLabel>Student name (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="intendedClass" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Intended class *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Choose a class" /></SelectTrigger></FormControl>
                            <SelectContent>{classOptions.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="session" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Academic session *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="2026/2027">2026/2027</SelectItem>
                              <SelectItem value="2027/2028">2027/2028</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question or message (optional)</FormLabel>
                        <FormControl><Textarea rows={5} placeholder="Please do not include medical records, ID numbers, passwords or other sensitive information." {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <div className="hidden" aria-hidden="true">
                      <FormField control={form.control} name="website" render={({ field }) => (
                        <FormItem><FormLabel>Website</FormLabel><FormControl><Input tabIndex={-1} autoComplete="off" {...field} /></FormControl></FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="consent" render={({ field }) => (
                      <FormItem className="flex gap-3 items-start">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div>
                          <FormLabel>I agree that Winsome Model Schools may use these details to respond to my admissions enquiry. *</FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )} />

                    <Button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto">{isSubmitting ? 'Sending…' : 'Send enquiry'}</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card><CardContent className="p-5 flex gap-3"><ShieldCheck className="h-6 w-6 text-primary shrink-0" /><div><h2 className="font-semibold text-primary">Privacy first</h2><p className="text-sm text-muted-foreground">Only basic contact and admission-interest information is requested. Read our <Link to="/privacy" className="underline">privacy notice</Link>.</p></div></CardContent></Card>
              <Card><CardContent className="p-5 flex gap-3"><Phone className="h-6 w-6 text-primary shrink-0" /><div><h2 className="font-semibold text-primary">Prefer to call?</h2><a href="tel:+2348032319017" className="text-sm underline">+234 803 231 9017</a></div></CardContent></Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
