import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplets, ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Pulverizacao = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fazenda: "",
    area: "",
    produto: "",
    concentracao: "",
    velocidade: "",
    altitude: "",
    temperatura: "",
    umidade: "",
    vento: "",
    operador: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você integraria com seu backend
    toast({
      title: "Relatório de Pulverização Salvo!",
      description: "Os dados foram registrados com sucesso no sistema.",
    });
    
    // Reset form
    setFormData({
      fazenda: "",
      area: "",
      produto: "",
      concentracao: "",
      velocidade: "",
      altitude: "",
      temperatura: "",
      umidade: "",
      vento: "",
      operador: "",
      observacoes: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero shadow-agriculture">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Link>
              </Button>
              <Droplets className="h-8 w-8 text-primary-foreground" />
              <h1 className="text-2xl font-bold text-primary-foreground">Relatório de Pulverização</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-agriculture">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="text-2xl">Cadastro de Pulverização - HD540s</CardTitle>
              <CardDescription className="text-primary-foreground/90">
                Registre todos os dados da operação de pulverização realizada
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informações da Área */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fazenda">Nome da Fazenda/Propriedade</Label>
                    <Input
                      id="fazenda"
                      value={formData.fazenda}
                      onChange={(e) => handleChange("fazenda", e.target.value)}
                      placeholder="Ex: Fazenda Santa Maria"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Área Pulverizada (hectares)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={formData.area}
                      onChange={(e) => handleChange("area", e.target.value)}
                      placeholder="Ex: 150"
                      required
                    />
                  </div>
                </div>

                {/* Informações do Produto */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="produto">Produto Aplicado</Label>
                    <Select value={formData.produto} onValueChange={(value) => handleChange("produto", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o produto" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="herbicida-pro">Herbicida PRO</SelectItem>
                        <SelectItem value="inseticida-max">Inseticida MAX</SelectItem>
                        <SelectItem value="fungicida-ultra">Fungicida ULTRA</SelectItem>
                        <SelectItem value="fertilizante-liquido">Fertilizante Líquido</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="concentracao">Concentração (L/ha)</Label>
                    <Input
                      id="concentracao"
                      type="number"
                      step="0.1"
                      value={formData.concentracao}
                      onChange={(e) => handleChange("concentracao", e.target.value)}
                      placeholder="Ex: 2.5"
                      required
                    />
                  </div>
                </div>

                {/* Parâmetros de Voo */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="velocidade">Velocidade (m/s)</Label>
                    <Input
                      id="velocidade"
                      type="number"
                      step="0.1"
                      value={formData.velocidade}
                      onChange={(e) => handleChange("velocidade", e.target.value)}
                      placeholder="Ex: 5.0"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altitude">Altitude (metros)</Label>
                    <Input
                      id="altitude"
                      type="number"
                      value={formData.altitude}
                      onChange={(e) => handleChange("altitude", e.target.value)}
                      placeholder="Ex: 3"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operador">Operador</Label>
                    <Input
                      id="operador"
                      value={formData.operador}
                      onChange={(e) => handleChange("operador", e.target.value)}
                      placeholder="Nome do piloto"
                      required
                    />
                  </div>
                </div>

                {/* Condições Climáticas */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="temperatura">Temperatura (°C)</Label>
                    <Input
                      id="temperatura"
                      type="number"
                      value={formData.temperatura}
                      onChange={(e) => handleChange("temperatura", e.target.value)}
                      placeholder="Ex: 25"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="umidade">Umidade (%)</Label>
                    <Input
                      id="umidade"
                      type="number"
                      value={formData.umidade}
                      onChange={(e) => handleChange("umidade", e.target.value)}
                      placeholder="Ex: 65"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vento">Velocidade do Vento (km/h)</Label>
                    <Input
                      id="vento"
                      type="number"
                      step="0.1"
                      value={formData.vento}
                      onChange={(e) => handleChange("vento", e.target.value)}
                      placeholder="Ex: 8.5"
                      required
                    />
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => handleChange("observacoes", e.target.value)}
                    placeholder="Registre informações importantes sobre a operação..."
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <Button asChild variant="outline">
                    <Link to="/">Cancelar</Link>
                  </Button>
                  <Button type="submit" className="bg-gradient-primary hover:bg-agriculture-primary/90">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Relatório
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Pulverizacao;